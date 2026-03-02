import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
constructor(
    @InjectRepository(City)
    private readonly cityrepo: Repository<City>,
){}

async create(data: Partial<City>) {
  const exists = await this.cityrepo.findOne({
    where: {
      name: data.name,
      country: data.country,
    },
  });

  if (exists) {
    throw new BadRequestException('City already exists');
  }

  return this.cityrepo.save(data);
}

findAll(){
    return this.cityrepo.find();
}
}
