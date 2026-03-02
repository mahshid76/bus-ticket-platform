import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route } from './route.entity';
import { City } from '../cities/city.entity';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepo: Repository<Route>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  async create(originCityId: number, destinationCityId: number) {
    if (originCityId === destinationCityId) {
      throw new BadRequestException('Origin and destination cannot be the same');
    }

    const origin = await this.cityRepo.findOneBy({ id: originCityId });
    const destination = await this.cityRepo.findOneBy({ id: destinationCityId });

    if (!origin || !destination) {
      throw new BadRequestException('City not found');
    }

    const route = this.routeRepo.create({
      originCity: origin,
      destinationCity: destination,
    });

    return this.routeRepo.save(route);
  }

  findAll() {
    return this.routeRepo.find({
      relations: ['originCity', 'destinationCity'],
    });
  }
}
