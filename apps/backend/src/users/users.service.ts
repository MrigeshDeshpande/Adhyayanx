import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * UsersService
 *
 * This service encapsulates all business logic related to user management.
 * It provides CRUD (Create, Read, Update, Delete) operations on an in-memory
 * array of users. In a real-world application, this would typically interact
 * with a database instead of a simple array.
 *
 * Methods:
 * - findAll() → Returns all users.
 * - findOne(id) → Finds a user by ID, throws NotFoundException if missing.
 * - create(dto) → Creates a new user from CreateUserDto.
 * - update(id, dto) → Partially updates an existing user using UpdateUserDto.
 * - replace(id, dto) → Fully replaces a user with new data from CreateUserDto.
 * - remove(id) → Deletes a user by ID and returns the removed user.
 *
 * Decorator:
 * - @Injectable() marks this class as a provider that can be injected
 *   into controllers or other services in NestJS.
 */
@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  /** Retrieve all users */
  findAll() {
    return this.users;
  }

  /** Find a single user by ID, or throw if not found */
  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  /** Create a new user from DTO */
  create(dto: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...dto,
    };
    this.users.push(newUser);
    return newUser;
  }

  /** Partially update an existing user */
  update(id: number, dto: UpdateUserDto) {
    const user = this.findOne(id);
    const updated = { ...user, ...dto };
    this.users = this.users.map((u) => (u.id === id ? updated : u));
    return updated;
  }

  /** Fully replace an existing user */
  replace(id: number, dto: CreateUserDto) {
    // ensure user exists
    this.findOne(id);

    const replaced = {
      id,
      ...dto,
    };
    this.users = this.users.map((u) => (u.id === id ? replaced : u));
    return replaced;
  }

  /** Remove a user by ID */
  remove(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }
}