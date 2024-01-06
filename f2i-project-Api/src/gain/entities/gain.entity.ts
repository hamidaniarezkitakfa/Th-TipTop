import { Ticket } from '../../tickets/entities/ticket.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Gain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  dateDeRecuperation: Date;

  @Column()
  dateLimiteDeRecuperation: Date;

  @ManyToMany(() => Ticket, (ticket) => ticket.gains)
  @JoinTable()
  tickets: Ticket[];
}
