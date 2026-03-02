import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, full_name: string) {
    const exists = await this.userRepo.findOneBy({ email });
    if (exists) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      email,
      password: hashed,
      full_name,
    });

    await this.userRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (!user) throw new BadRequestException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new BadRequestException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return { access_token: token };
  }
}
