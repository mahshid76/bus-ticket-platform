import { Controller, Post, Get, Body } from '@nestjs/common';
import { RoutesService } from './routes.service';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post()
  create(@Body() body: { originCityId: number; destinationCityId: number }) {
    return this.routesService.create(
      body.originCityId,
      body.destinationCityId,
    );
  }

  @Get()
  findAll() {
    return this.routesService.findAll();
  }
}
