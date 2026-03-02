import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TicketsService } from './tickets.service';

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post(':tripId')
  create(@Param('tripId') tripId: string, @Req() req) {
    return this.ticketService.createTicket(req.user.userId, Number(tripId));
  }
  @Get('me')
  myTickets(@Req() req) {
    return this.ticketService.myTickets(req.user.userId);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Req() req) {
    return this.ticketService.cancelTicket(req.user.userId, Number(id));
  }
}
