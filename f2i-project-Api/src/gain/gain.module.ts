import { Module } from '@nestjs/common';
import { GainService } from './gain.service';
import { GainController } from './gain.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gain } from './entities/gain.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gain, Ticket])],
  controllers: [GainController],
  providers: [GainService],
})
export class GainModule {}
