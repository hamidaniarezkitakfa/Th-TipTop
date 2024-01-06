import { ApiProperty } from '@nestjs/swagger';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Produit {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nomDeProduit: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @Column()
  prix: number;

  @ApiProperty()
  @Column()
  discription: string;

  @ApiProperty()
  @Column()
  stock: number;

  @ManyToMany(() => Ticket, (ticket) => ticket.produits)
  tickets: Ticket[];

  @ManyToOne(() => User, (user) => user.produits)
  user: User;
}
