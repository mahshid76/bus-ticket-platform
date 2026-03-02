import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './trip.entity';
import { Repository } from 'typeorm';
import { Company } from 'src/companies/company.entity';
import { Route } from 'src/routes/route.entity';

@Injectable()
export class TripsService {
    constructor(
        @InjectRepository(Trip)
        private readonly tripRepo: Repository<Trip>,
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,
        @InjectRepository(Route)
        private readonly routeRepo: Repository<Route>,
    ) {}
    async create(data: {
        routeId: number;
        companyId: number;
        departure_date: string;
        departure_time: string;
        arrival_time: string;
        price: number;
        seat_capacity: number;
    }) {
        const route = await this.routeRepo.findOneBy({ id: data.routeId });
        const company = await this.companyRepo.findOneBy({ id: data.companyId });
        if (!route || !company) {
            throw new BadRequestException('Invalid route or company ID');
    }
        const trip = this.tripRepo.create({
            route,
            company,
            departure_date: data.departure_date,
            departure_time: data.departure_time,
            arrival_time: data.arrival_time,
            price: data.price,
            seat_capacity: data.seat_capacity,
            available_seats: data.seat_capacity,
        });
        return this.tripRepo.save(trip);
    }
    async searchTrips(
        originCityId: number,
        destinationCityId: number,
        date: string) {
        return this.tripRepo.createQueryBuilder('trip')
            .leftJoinAndSelect('trip.route', 'route')
            .leftJoinAndSelect('route.originCity', 'originCity')
            .leftJoinAndSelect('route.destinationCity', 'destinationCity')
            .leftJoinAndSelect('trip.company', 'company')
            .where('originCity.id = :originCityId', { originCityId })
            .andWhere('destinationCity.id = :destinationCityId', { destinationCityId })

            .andWhere('trip.departure_date = :date', { date })
            .getMany();
    }

    async holdSeat(tripId: number) {
  const trip = await this.tripRepo.findOneBy({ id: tripId });

  if (!trip || trip.available_seats <= 0) {
    throw new BadRequestException('No seats available');
  }

  trip.available_seats -= 1;
  await this.tripRepo.save(trip);

  setTimeout(async () => {
    const latestTrip = await this.tripRepo.findOneBy({ id: tripId });
    if (latestTrip) {
      latestTrip.available_seats += 1;
      await this.tripRepo.save(latestTrip);
    }
  }, 10 * 60 * 1000);

  return { message: 'Seat held for 10 minutes' };
}

    findAll() {
       return this.tripRepo.find({
        relations: ['route', 'route.originCity', 'route.destinationCity', 'company'],
        });
    }
}
