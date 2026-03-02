import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/notifications/email/email.service';
import { Ticket, TicketStatus } from 'src/tickets/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    private readonly emailService: EmailService,
  ) {}

  // ✅ MOCK PAYMENT INTENT (Stripe disabled)
  async createPaymentIntent(ticketId: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: ticketId },
      relations: ['trip', 'user'],
    });

    if (!ticket || ticket.status !== TicketStatus.HELD) {
      throw new BadRequestException('Invalid ticket');
    }

    // 🔴 Stripe is mocked (no external call)
    return {
      clientSecret: 'mock_client_secret_for_dev',
    };
  }

  // ✅ CONFIRM PAYMENT (finalize ticket)
  async confirmPayment(ticketId: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: ticketId },
      relations: ['trip', 'user'],
    });

    if (!ticket) {
      throw new BadRequestException('Ticket not found');
    }

    ticket.status = TicketStatus.CONFIRMED;
    await this.ticketRepo.save(ticket);

    await this.emailService.sendTicketConfirmation
    (ticket.user.email, ticket.id);

    return { message: 'Payment confirmed & ticket issued' };
  }
}
