import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(
    search?: string,
    sort?: string,
    order?: 'asc' | 'desc',
    page?: number,
    limit?: number,
  ): Promise<[User[], number]> {
    const query = this.usersRepository.createQueryBuilder('user');

    query.leftJoinAndSelect('user.skills', 'skill');

    if (search) {
      query.where(
        'LOWER(user.firstName) LIKE :search OR LOWER(user.lastName) LIKE :search OR LOWER(skill.name) LIKE :search',
        { search: `%${search.toLowerCase()}%` },
      );
    }

    const sortField = sort ?? 'lastName';
    const sortOrder = (order ?? 'asc').toUpperCase() as 'ASC' | 'DESC';
    query.orderBy(`user.${sortField}`, sortOrder);

    const pageNum = page ?? 1;
    const pageSize = limit ?? 10;
    query.skip((pageNum - 1) * pageSize).take(pageSize);

    return query.getManyAndCount();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['skills', 'education', 'experience', 'experience.company'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
}
