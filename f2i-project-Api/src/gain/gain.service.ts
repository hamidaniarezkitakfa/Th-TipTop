import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gain } from './entities/gain.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';
import { CreateGainDto } from './dto/create-gain.dto';
import { UpdateGainDto } from './dto/update-gain.dto';

@Injectable()
export class GainService {
  constructor(
    @InjectRepository(Gain)
    private gainRepository: Repository<Gain>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createGainDto: CreateGainDto): Promise<Gain> {
    const tickets = await Promise.all(
      createGainDto.ticketIds.map((id) =>
        this.ticketRepository.findOneBy({ id }),
      ),
    );
    const gain = this.gainRepository.create({
      ...createGainDto,
      tickets: tickets.filter((ticket) => ticket !== undefined),
    });
    return this.gainRepository.save(gain);
  }

  async findAll(): Promise<Gain[]> {
    return this.gainRepository.find({ relations: ['tickets'] });
  }

  async findOne(id: number): Promise<Gain> {
    return this.gainRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
  }

  async update(id: number, updateGainDto: UpdateGainDto): Promise<Gain> {
    const gain = await this.findOne(id);
    if (!gain) {
      throw new Error(`Gain #${id} not found`);
    }

    Object.assign(gain, updateGainDto);

    return this.gainRepository.save(gain);
  }

  async remove(id: number): Promise<void> {
    const gain = await this.findOne(id);
    if (!gain) {
      throw new Error(`Gain #${id} not found`);
    }
    await this.gainRepository.remove(gain);
  }
}
