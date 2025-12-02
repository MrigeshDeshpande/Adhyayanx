import { IsString, IsEmail } from 'class-validator';

/**
 * Data Transfer Object (DTO) for creating a new user.
 *
 * This class defines the structure and validation rules
 * for user creation requests. It ensures that:
 * - `name` must be a string
 * - `email` must follow a valid email format
 */

export class CreateUserDto {
  /**
   * The full name of the user.
   * Must be a non-empty string.
   */
  @IsString()
  name: string;

  /**
   * The email address of the user.
   * Must be a valid email format (e.g., user@example.com).
   */
  @IsEmail()
  email: string;
}