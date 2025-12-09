// app/api/users/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAccessToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get('authorization') || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    if (!token) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    let payload: any;
    try {
      payload = verifyAccessToken(token) as any;
    } catch (e) {
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, fullName: true, role: true, instituteId: true },
    });
    if (!user) return NextResponse.json({ error: 'not_found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}
