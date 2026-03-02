import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/ticket.entity';
import { NotificationModule } from 'src/notifications/notfication.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]),
  NotificationModule,
],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
