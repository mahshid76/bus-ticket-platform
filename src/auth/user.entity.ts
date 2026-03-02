import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    full_name: string;

}