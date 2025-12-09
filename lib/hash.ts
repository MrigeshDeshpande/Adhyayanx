import bcrypt from 'bcryptjs';

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS || 12);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function hashToken(token: string) {
  return bcrypt.hash(token, SALT_ROUNDS);
}

export async function verifyToken(token: string, hash: string) {
  return bcrypt.compare(token, hash);
}
