import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket, TicketStatus } from './ticket.entity';
import { LessThan, Repository } from 'typeorm';

Injectable();
export class TicketCleanupService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}
  @Cron('*/1 * * * *')
  async cleanupExpiredTickets() {
    const expired = await this.ticketRepo.find({
      where: {
        status: TicketStatus.HELD,
        expires_at: LessThan(new Date()),
      },
      relations: ['trip'],
    });
    for (const ticket of expired) {
      ticket.status = TicketStatus.CANCELLED;
      ticket.trip.available_seats += 1;
      await this.ticketRepo.save(ticket);
    }
  }
}