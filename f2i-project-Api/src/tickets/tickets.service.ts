import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { In, MoreThan, Repository, EntityManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Jeux } from 'src/jeux/entities/jeux.entity';
import { Produit } from 'src/produits/entities/produit.entity';
import { Gain } from 'src/gain/entities/gain.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Jeux) private jeuxRepository: Repository<Jeux>,
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
    @InjectRepository(Gain) private gainRepository: Repository<Gain>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createTicketForStore(): Promise<Ticket> {
    const newTicket = this.ticketRepository.create();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketNumber = '';

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticketNumber += characters.charAt(randomIndex);
    }
    newTicket.numTicket = ticketNumber;
    newTicket.etat = true;
    newTicket.user = null;

    const activeJeux = await this.jeuxRepository.findOne({
      where: {
        dateFin: MoreThan(new Date()),
      },
      relations: ['jeuxDetails'],
    });

    if (!activeJeux || activeJeux.jeuxDetails.length === 0) {
      throw new BadRequestException('No active Jeux available.');
    }

    const randomIndex = Math.floor(
      Math.random() * activeJeux.jeuxDetails.length,
    );
    const selectedJeuxDetails = activeJeux.jeuxDetails[randomIndex];
    newTicket.jeuxDetails = selectedJeuxDetails;

    const gain = new Gain();
    const newDate = new Date(activeJeux.dateFin);
    newDate.setMonth(newDate.getMonth() + 1);
    gain.dateLimiteDeRecuperation = newDate;
    await this.gainRepository.save(gain);
    newTicket.gains = [gain];

    return this.ticketRepository.save(newTicket);
  }

  async create(createTicketDto: CreateTicketDto, user: User) {
    const { montant, produitIds } = createTicketDto;
    const newTicket = this.ticketRepository.create(createTicketDto);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let ticketNumber = '';

    for (let i = 0; i < 15; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      ticketNumber += characters.charAt(randomIndex);
    }

    newTicket.user = user;
    newTicket.numTicket = ticketNumber;

    const produits = await this.produitRepository.find({
      where: { id: In(produitIds) },
    });

    // Assign the fetched produits to the new ticket
    newTicket.produits = produits;

    if (montant && montant >= 49) {
      // Find the active Jeux and JeuxDetails with an open dateFin
      const activeJeux = await this.jeuxRepository.findOne({
        where: {
          dateFin: MoreThan(new Date()),
        },
        relations: ['jeuxDetails'], // Include the JeuxDetails relationship
      });

      if (activeJeux && activeJeux.jeuxDetails.length > 0) {
        const eligibleJeuxDetails = activeJeux.jeuxDetails.filter(
          async (jeuxDetails) => {
            // Count the number of existing tickets associated with this JeuxDetails
            const ticketCount = await this.ticketRepository.count({
              where: {
                jeuxDetails: jeuxDetails,
              },
            });

            return ticketCount < jeuxDetails.nombreTicket;
          },
        );

        if (eligibleJeuxDetails.length === 0) {
          throw new BadRequestException(
            'No eligible JeuxDetails with available tickets.',
          );
        }

        // Pick a random eligible JeuxDetails
        const randomIndex = Math.floor(
          Math.random() * eligibleJeuxDetails.length,
        );
        const selectedJeuxDetails = eligibleJeuxDetails[randomIndex];

        // Check if the selected JeuxDetails has already reached the maximum allowed tickets
        const selectedJeuxDetailsTicketCount =
          await this.ticketRepository.count({
            where: {
              jeuxDetails: selectedJeuxDetails,
            },
          });

        if (
          selectedJeuxDetailsTicketCount >= selectedJeuxDetails.nombreTicket
        ) {
          return this.ticketRepository.save(newTicket);
        }

        // Set the selected JeuxDetails for the new Ticket
        newTicket.jeuxDetails = selectedJeuxDetails;

        // Set the etat to true as the ticket is participating in JeuxDetails
        newTicket.etat = true;

        const gain = new Gain();
        const newDate = new Date(activeJeux.dateFin);
        newDate.setMonth(newDate.getMonth() + 1);

        gain.dateLimiteDeRecuperation = newDate;
        await this.gainRepository.save(gain);

        newTicket.gains = [gain];
      }
    }

    return this.ticketRepository.save(newTicket);
  }

  async getUserTicketsHistory(user: User): Promise<Ticket[]> {
    return this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.gains', 'gain')
      .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
      .where('ticket.user = :userId', { userId: user.id })
      .andWhere('ticket.etat = :etat', { etat: true })
      .getMany();
  }

  async findAll(user: User) {
    try {
      const tickets = await this.ticketRepository
        .createQueryBuilder('ticket')
        .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
        .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
        .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
        .leftJoinAndSelect('ticket.user', 'user')
        .where('user.id = :userId', { userId: user.id })
        .getMany();

      return tickets;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number, user: User) {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
      .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
      .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
      .leftJoinAndSelect('ticket.user', 'user')
      .where('ticket.id = :id', { id })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();

    if (!ticket) {
      throw new NotFoundException(`Ticket with ID #${id} not found`);
    }
    return ticket;
  }

  async findParticipant(username?: string, ticketNumber?: string) {
    const query = this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoin('ticket.user', 'user')
      .select([
        'ticket.id',
        'ticket.numTicket',
        'ticket.etat',
        'ticket.participer',
        'user.username',
        'user.email',
        'user.id',
      ]);

    if (username) {
      query.andWhere('user.username LIKE :username', {
        username: `%${username}%`,
      });
    }

    if (ticketNumber) {
      query.andWhere('ticket.numTicket LIKE :ticketNumber', {
        ticketNumber: `%${ticketNumber}%`,
      });
    }

    const tickets = await query.getMany();

    return tickets.map((ticket) => ({
      userId: ticket.user ? ticket.user.id : null,
      username: ticket.user ? ticket.user.username : null,
      userEmail: ticket.user ? ticket.user.email : null,
      ticketNumber: ticket.numTicket,
      ticketId: ticket.id,
      status: ticket.etat ? 'participer' : 'NonParticiper',
      particper: ticket.participer ? 'participer' : 'NonParticiper',
    }));
  }

  async countParticipants() {
    const count = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select('COUNT(DISTINCT ticket.user)', 'participantCount')
      .getRawOne();

    return count.participantCount;
  }

  async findOneByNumTicket(numTicket: string, user: User): Promise<Ticket> {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.jeuxDetails', 'jeuxDetails')
      .leftJoinAndSelect('jeuxDetails.jeux', 'jeux')
      .leftJoinAndMapMany('ticket.produits', 'ticket.produits', 'produit')
      .leftJoinAndSelect('ticket.gains', 'gain')
      .leftJoinAndSelect('ticket.user', 'user')
      .where('ticket.numTicket = :numTicket', { numTicket })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();

    if (!ticket) {
      throw new NotFoundException(`Ticket with number ${numTicket} not found`);
    }
    return ticket;
  }

  async findByNum(numTicket: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({
      numTicket: numTicket,
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket with number ${numTicket} not found`);
    }
    return ticket;
  }

  async assignUserToTicket(ticketId: number, userId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOneBy({
      id: ticketId,
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.user) {
      throw new BadRequestException('Ticket is already assigned to a user');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    ticket.user = user;
    ticket.participer = true;
    return this.ticketRepository.save(ticket);
  }

  async update(id: number, updateTicketDto: UpdateTicketDto, user: User) {
    const updatedTicket = await this.findOne(id, user);

    if (!updatedTicket) {
      throw new NotFoundException(`Ticket with ID #${id} not found`);
    }

    Object.assign(updatedTicket, updateTicketDto);
    return this.ticketRepository.save(updatedTicket);
  }
}
