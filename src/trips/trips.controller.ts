import { Controller, Post, Get, Body, Query, Param, UseGuards, Req} from '@nestjs/common';
import { TripsService } from './trips.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) {}

    @Post()
    create(@Body() body) {
        return this.tripsService.create(body);
    }

    @Get()
    findAll() {
        return this.tripsService.findAll();
    }

    @Get('search')
    search(
        @Query('originCityId') originCityId: string,
        @Query('destinationCityId') destinationCityId: string,
        @Query('date') date: string,
    ) {
        return this.tripsService.searchTrips(
            Number(originCityId),
            Number(destinationCityId),
            date,
        );
    }
    @UseGuards(JwtAuthGuard)
    @Post(':id/hold')
holdSeat(@Param('id') id: string, @Req() req) {
  return this.tripsService.holdSeat(Number(id));
}

}
