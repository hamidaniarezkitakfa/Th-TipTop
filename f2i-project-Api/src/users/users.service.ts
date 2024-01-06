import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.UserRepository.create(createUserDto);
    return this.UserRepository.save(newUser);
  }

  findAll() {
    return this.UserRepository.find();
  }

  async findAllWithFilter(
    username?: string,
    isAdmin?: boolean,
    isWorker?: boolean,
  ): Promise<User[]> {
    const query = this.UserRepository.createQueryBuilder('user');

    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }

    if (isAdmin !== undefined) {
      query.andWhere('user.isAdmin = :isAdmin', { isAdmin });
    }

    if (isWorker !== undefined) {
      query.andWhere('user.isWorker = :isWorker', { isWorker });
    }

    return query.getMany();
  }

  async countNewUsers() {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const count = await this.UserRepository.createQueryBuilder('user')
      .where('user.createdAt >= :sevenDaysAgo', { sevenDaysAgo })
      .getCount();

    return count;
  }

  findOneByEmail(email: string) {
    return this.UserRepository.findOneBy({ email: email });
  }

  findOne(id: number): Promise<User | undefined> {
    return this.UserRepository.findOneBy({ id: id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, updateUserDto);
    return this.UserRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.UserRepository.remove(user);
  }
}
