/**
 * Prisma Database Client Configuration
 * 
 * Configures and exports a Prisma client instance with PostgreSQL adapter.
 * This setup uses a connection pool for efficient database connections.
 * 
 * The module uses the Prisma driver adapter pattern to integrate with the
 * native PostgreSQL driver (pg) for better performance and compatibility.
 * 
 * @module prisma
 * 
 * @requires DATABASE_URL - PostgreSQL connection string from environment variables
 */

import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL missing in env');
}

/**
 * PostgreSQL connection pool.
 * Manages a pool of database connections for efficient resource usage.
 * @constant
 */
const pool = new Pool({ connectionString });

/**
 * Prisma PostgreSQL adapter.
 * Bridges Prisma Client with the native PostgreSQL driver.
 * @constant
 */
const adapter = new PrismaPg(pool);

/**
 * Configured Prisma Client instance.
 * Use this instance throughout the application for all database operations.
 * 
 * @example
 * ```typescript
 * import { prisma } from '@/lib/prisma';
 * 
 * const user = await prisma.user.findUnique({
 *   where: { email: 'user@example.com' }
 * });
 * ```
 */
export const prisma = new PrismaClient({ adapter });

/**
 * PostgreSQL connection pool.
 * Exported for advanced use cases that require direct pool access.
 */
export { pool };
