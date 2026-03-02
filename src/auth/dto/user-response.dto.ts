import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  email: string;
  fullName: string;

  @Exclude()
  password: string;
}
