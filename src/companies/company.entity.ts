import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"; 

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    contact_info: string;
}