import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { City } from '../cities/city.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'origin_city_id' })
  originCity: City;

  @ManyToOne(() => City)
  @JoinColumn({ name: 'destination_city_id' })
  destinationCity: City;
}
