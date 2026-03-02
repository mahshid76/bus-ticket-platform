import { Body, Controller, Post, Get } from '@nestjs/common';
import { CitiesService } from './cities.service';


@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService){}

    @Post()
    create( @Body() body){
        return this.citiesService.create(body);
    }

@Get()
findAll(){
    return this.citiesService.findAll();
}
}
