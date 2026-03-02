import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { User } from 'src/auth/user.entity';
import { Trip } from 'src/trips/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket,User,Trip])],
  providers: [TicketsService],
  controllers: [TicketsController]
})
export class TicketsModule {}
