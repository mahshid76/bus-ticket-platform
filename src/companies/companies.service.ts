import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,
    ) {}

    create(data: Partial<Company>){
        return this.companyRepo.save(data);
    }

    findAll(){
        return this.companyRepo.find();
    }
}
