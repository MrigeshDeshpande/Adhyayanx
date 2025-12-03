import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/**
 * UsersModule
 *
 * This module bundles together all user-related components of the application. It registers:
 * - UsersController to handle incoming HTTP requests related to users (e.g., create, update, fetch).
 * - UsersService to encapsulate business logic and interact with data sources for user operations.
 *
 * NestJS modules act as organizational units, grouping controllers and providers so the application remains modular, maintainable, and scalable.
 */

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}