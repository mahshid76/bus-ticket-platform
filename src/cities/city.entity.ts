import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('cities')
@Unique(['name', 'country'])
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;
}
