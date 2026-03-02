import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitiesModule } from './cities/cities.module';
import { CompaniesModule } from './companies/companies.module';
import { RoutesModule } from './routes/routes.module';
import { TripsModule } from './trips/trips.module';
import { AuthModule } from './auth/auth.module';
import { TicketsModule } from './tickets/tickets.module';
import { PaymentsModule } from './payments/payments.module';
import { ScheduleModule as scheduleModule } from '@nestjs/schedule';
import { EmailService } from './notifications/email/email.service';
import { NotificationModule } from './notifications/notfication.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CitiesModule,
    CompaniesModule,
    RoutesModule,
    TripsModule,
    AuthModule,
    TicketsModule,
    PaymentsModule,
    scheduleModule.forRoot(),
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}

