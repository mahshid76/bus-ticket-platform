import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './ticket.entity';
import { User } from 'src/auth/user.entity';
import { Trip } from 'src/trips/trip.entity';
@Injectable()
export class TicketsService {
  emailService: any;
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Trip)
    private readonly tripRepo: Repository<Trip>,
  ) {}

  async createTicket(userId: number, tripId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const trip = await this.tripRepo.findOneBy({ id: tripId });

    if (!user || !trip) {
      throw new BadRequestException('User or Trip not found');
    }
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    const ticket = this.ticketRepo.create({
      user,
      trip,
      status: TicketStatus.HELD,
      expires_at: expiresAt,
    });

    return this.ticketRepo.save(ticket);
  }

  async myTickets(userId: number) {
    return this.ticketRepo.find({
      where: { user: { id: userId } },
      relations: ['trip', 'trip.route', 'trip.company', 'user'],
    });
  }

  async cancelTicket(userId: number, ticketId: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: ticketId, user: { id: userId } },
      relations: ['trip', 'user'],
    });
    if (!ticket) {
      throw new BadRequestException('Ticket not found');
    }
    if (ticket.user.id !== userId) {
      throw new BadRequestException('Access denied');
    }
    const departure = new Date(ticket.trip.departure_time);
    const now = new Date();

    const diffHours = (departure.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 24) {
      throw new BadRequestException(
        'Cancellations are only allowed up to 24 hours before departure',
      );
    }

    ticket.status = TicketStatus.CANCELLED;
    await this.ticketRepo.save(ticket);
    ticket.trip.available_seats += 1;
    await this.tripRepo.save(ticket.trip);
    await this.emailService.sendTicketCancellation
    (ticket.user.email, ticket.id);

    return { message: 'Ticket cancelled successfully' };
  }
}
