import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Filter users by name (case-insensitive contains)',
    type: String,
  })
  @ApiOkResponse({
    description: 'Users retrieved successfully',
    type: User,
    isArray: true,
  })
  async findAll(@Query('search') search?: string): Promise<User[]> {
    return this.usersService.findAll(search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiParam({ name: 'id', type: Number, description: 'User id' })
  @ApiOkResponse({ description: 'User retrieved successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiParam({ name: 'id', type: Number, description: 'User id' })
  @ApiBody({ type: UserDto })
  @ApiOkResponse({ description: 'User updated successfully', type: User })
  @ApiNotFoundResponse({ description: 'User not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }
}
