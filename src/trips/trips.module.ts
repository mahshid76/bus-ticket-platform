import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from 'src/routes/route.entity';
import { Company } from 'src/companies/company.entity';
import { Trip } from './trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trip, Route, Company])],
  providers: [TripsService],
  controllers: [TripsController]
})
export class TripsModule {}
