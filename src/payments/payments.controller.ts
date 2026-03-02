import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Post(':ticketId/intent')
  createIntent(@Param('ticketId') ticketId: string) {
    return this.paymentService.createPaymentIntent(Number(ticketId));
  }
  @Post(':ticketId/confirm')
  confirm(@Param('ticketId') ticketId: string) {
    return this.paymentService.confirmPayment(Number(ticketId));
  }
}
