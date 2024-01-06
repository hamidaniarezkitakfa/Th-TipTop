import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  img: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ManyToOne(() => User, (user) => user.blog)
  user: User;
}
