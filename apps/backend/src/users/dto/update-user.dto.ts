import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

/**
 * Data Transfer Object (DTO) for updating an existing user.
 *
 * This class extends `CreateUserDto` but makes all of its
 * properties optional using NestJS's `PartialType` utility.
 *
 * Use case:
 * - When updating a user, you may only want to provide
 *   some fields (e.g., just the email or just the name).
 * - `PartialType` automatically marks all fields from
 *   `CreateUserDto` as optional, so you don’t need to
 *   redefine them manually.
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}