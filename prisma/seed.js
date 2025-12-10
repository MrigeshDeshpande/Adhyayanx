require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("ERROR: DATABASE_URL not set in .env");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function safeHash(password) {
  const rounds = Number(process.env.BCRYPT_SALT_ROUNDS || 12);
  return bcrypt.hash(password, rounds);
}

async function createOrUpdateInstitute(data) {
  return prisma.institute.upsert({
    where: {
      email:
        data.email ??
        `institute-${data.name.replace(/\s+/g, "-").toLowerCase()}@local`,
    },
    create: data,
    update: data,
  });
}

async function createUserIfMissing({
  email,
  role,
  fullName,
  instituteId,
  password,
}) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`User exists → ${email}`);
    return existing;
  }
  const pass = password || process.env.DEFAULT_SEED_PASSWORD || "Password@123";
  const passwordHash = await safeHash(pass);
  const created = await prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName,
      role,
      status: "ACTIVE",
      instituteId,
    },
  });
  console.log(`Created user: ${email} (${role})`);
  return created;
}

async function createCourseIfMissing({ instituteId, title, slug, shortDesc }) {
  const existing = await prisma.course.findUnique({ where: { slug } });
  if (existing) {
    console.log(`Course exists → ${slug}`);
    return existing;
  }
  const created = await prisma.course.create({
    data: {
      instituteId,
      title,
      slug,
      shortDesc,
    },
  });
  console.log(`Created course: ${title}`);
  return created;
}

async function createBatchIfMissing({
  courseId,
  instituteId,
  title,
  startDate,
  endDate,
  timezone,
}) {
  const existing = await prisma.batch.findFirst({
    where: { courseId, title },
  });
  if (existing) {
    console.log(`Batch exists → ${title}`);
    return existing;
  }
  const created = await prisma.batch.create({
    data: {
      courseId,
      instituteId,
      title,
      startDate,
      endDate,
      timezone,
    },
  });
  console.log(`Created batch: ${title}`);
  return created;
}

async function main() {
  console.log("🌱 Starting seed...");

  // 1) create institute
  const skillyard = await createOrUpdateInstitute({
    name: "Skillyard Academy",
    slug: "skillyard-academy",
    email: "contact@skillyard.local",
    phone: "9876543210",
    address: "Nagpur, India",
    city: "Nagpur",
    timezone: "Asia/Kolkata",
  });

  // 2) ensure SUPERADMIN exists (safe)
  await createUserIfMissing({
    email: process.env.SEED_ADMIN_EMAIL || "admin@adhyayanx.local",
    role: "SUPERADMIN",
    fullName: "Super Admin",
    password: process.env.SEED_ADMIN_PASS || "Admin@1234",
  });

  // 3) institute admin
  await createUserIfMissing({
    email: "admin@skillyard.local",
    role: "INSTITUTE_ADMIN",
    fullName: "Skillyard Admin",
    instituteId: skillyard.id,
    password: "InstAdmin@123",
  });

  // 4) teachers
  await createUserIfMissing({
    email: "teacher1@skillyard.local",
    role: "TEACHER",
    fullName: "John Teacher",
    instituteId: skillyard.id,
    password: "Teacher@123",
  });

  await createUserIfMissing({
    email: "teacher2@skillyard.local",
    role: "TEACHER",
    fullName: "Priya Sharma",
    instituteId: skillyard.id,
    password: "Teacher@123",
  });

  // 5) students
  await createUserIfMissing({
    email: "student1@skillyard.local",
    role: "STUDENT",
    fullName: "Amit Student",
    instituteId: skillyard.id,
    password: "Student@123",
  });

  await createUserIfMissing({
    email: "student2@skillyard.local",
    role: "STUDENT",
    fullName: "Sneha Student",
    instituteId: skillyard.id,
    password: "Student@123",
  });

  // 6) create a sample course
  const course = await createCourseIfMissing({
    instituteId: skillyard.id,
    title: "Intro to MERN - Demo Course",
    slug: "intro-to-mern-demo",
    shortDesc: "A short demo course for MERN basics and project workflows.",
  });

  // 7) create a sample batch for that course
  await createBatchIfMissing({
    courseId: course.id,
    instituteId: skillyard.id,
    title: "MERN Batch - Dec 2025",
    startDate: new Date("2025-12-15T10:00:00.000Z"),
    endDate: new Date("2026-03-15T10:00:00.000Z"),
    timezone: "Asia/Kolkata",
  });

  console.log("🎉 Seed completed.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    try {
      await prisma.$disconnect();
      await pool.end();
    } catch (e) {
      // ignore
    }
  });
