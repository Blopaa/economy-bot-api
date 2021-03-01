import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";
import { User } from "./user.entity";
import { UserServer } from "./user_server.entity";

@Entity()
export class Rol extends BaseEntity{
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    bonus: number

    @OneToOne(() => UserServer, user => user.rol)
    user: User;
}