import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";
import { Server } from "./server.entity";
import { User } from "./user.entity";

@Entity("user_server")
export class UserServer extends BaseEntity {
    @Column()
    coins: number;

    @ManyToOne(() => User, user => user.userServer)
    user: User;

    @ManyToOne(() => Server, server => server.userServer)
    server: Server;
}