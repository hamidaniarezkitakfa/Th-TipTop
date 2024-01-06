import { ApiProperty } from '@nestjs/swagger';
import { Blog } from '../../blogs/entities/blog.entity';
import { Jeux } from '../../jeux/entities/jeux.entity';
import { Produit } from '../../produits/entities/produit.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @Column({ nullable: true })
  image?: string;

  @ApiProperty()
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty()
  @Column({ default: false })
  isWorker: boolean;

  @OneToMany(() => Ticket, (ticket) => ticket.user, { cascade: true })
  tickets: Ticket[];

  @OneToMany(() => Jeux, (jeux) => jeux.user, { cascade: true })
  jeux: Jeux[];

  @OneToMany(() => Blog, (blog) => blog.user, { cascade: true })
  blog: Blog[];

  @OneToMany(() => Produit, (produit) => produit.user, { cascade: true })
  produits: Produit[];
}
