import { User } from "src/auth/user.entity";
import { Trip } from "src/trips/trip.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TicketStatus {
    HELD = 'HELD',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'cancelled',
}

@Entity('tickets')
export class Ticket {
@PrimaryGeneratedColumn()
id: number;

@ManyToOne(() => User)
user: User;

@ManyToOne(() => Trip)
trip: Trip;

@Column({
    type: 'enum', enum: TicketStatus,})
    status: TicketStatus;

@Column({ type: 'timestamp', nullable: true })
expires_at: Date;


@CreateDateColumn()
created_at: Date;

}

