import { Company } from "src/companies/company.entity";
import { Route } from "src/routes/route.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn , JoinColumn} from "typeorm";


@Entity('trips')
export class Trip {
    @PrimaryGeneratedColumn()
    id: number;

@ManyToOne(() => Route)
@JoinColumn({ name: 'route_id' })
route: Route;

@ManyToOne(() => Company)
@JoinColumn({ name: 'company_id' })
company: Company;   

@Column({ type: 'date' })
departure_date: string;

@Column({ type: 'time' })
departure_time: string;

@Column({ type: 'time' })
arrival_time: string;

@Column({ type: 'decimal'})
price: number;

@Column()
seat_capacity: number;

@Column()
available_seats: number;

}
