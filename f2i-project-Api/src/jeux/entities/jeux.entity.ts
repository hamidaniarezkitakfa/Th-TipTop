import { ApiProperty } from '@nestjs/swagger';
import { JeuxDetails } from '../../jeux-details/entities/jeux-details.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Jeux {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  nomJeux: string;

  @CreateDateColumn()
  @ApiProperty()
  dateDebut?: Date;

  @CreateDateColumn()
  @ApiProperty()
  dateFin?: Date;

  @Column()
  @ApiProperty()
  nombreDeTicketTotal: number;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  grandLots: string;

  @ManyToOne(() => User, (user) => user.jeux)
  user: User;

  @OneToMany(() => JeuxDetails, (jeuxDetails) => jeuxDetails.jeux, {
    cascade: true,
  })
  jeuxDetails: JeuxDetails[];
}
