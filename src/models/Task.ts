import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    description: string;

    @Column()
    completed: boolean;
}