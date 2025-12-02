import {
    Controller,
    Get,
    Post,
    Put,
    Patch,
    Delete,
    Param,
    Body,
} from '@nestjs/common';

import { UsersService } from './users.service';
    import { CreateUserDto } from './dto/create-user.dto';
    import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /**
     * GET /users
     * 
     * Returns a list of all users.
     * 
     * @returns {Array} Array of user objects
     */
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    /**
     * GET /users/:id
     * 
     * Returns a single user by ID.
     *
     * @param {string} id - The ID of the user to find
     * @returns {Object} The user object if found
     * @throws {NotFoundException} If user does not exist
     */
    
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(Number(id));
    }

    /**
     * POST /users
     * 
     * Creates a new user using the CreateUserDto.
     * 
     * @param {CreateUserDto} dto - User data for creation
     * @returns {Object} Newly created user object
     */

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    /**
     * PUT /users/:id
     * 
     * Fully replaces an existing user.
     * Requires all fields defined in CreateUserDto.
     *
     * @param {string} id - ID of the user to replace
     * @param {CreateUserDto} dto - Full updated user data
     * @returns {Object} The replaced user object
     */

    @Put(':id')
    replace(@Param('id') id: string, @Body() dto: CreateUserDto) {
        return this.usersService.replace(Number(id), dto);
    }

    /**
     * PATCH /users/:id
     * 
     * Partially updates an existing user.
     * Accepts partial fields via UpdateUserDto.
     *
     * @param {string} id - ID of the user to update
     * @param {UpdateUserDto} dto - Partial user data
     * @returns {Object} The updated user object
     */

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(Number(id), dto);
    }

    /**
     * DELETE /users/:id
     * 
     * Deletes a user by ID.
     *
     * @param {string} id - ID of the user to remove
     * @returns {Object} The removed user object
     */

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(Number(id));
    }
}
