import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";
import { Rol } from "./role.entity";
import { Server } from "./server.entity";
import { User } from "./user.entity";

@Entity("user_server")
export class UserServer extends BaseEntity {
    @Column()
    coins: number;

    @OneToOne(() => Rol, rol => rol.user, {nullable: true})
    @JoinColumn()
    rol: Rol;

    @ManyToOne(() => User, user => user.userServer, {nullable: false})
    @JoinColumn()
    user: User;

    @ManyToOne(() => Server, server => server.userServer, {nullable: false})
    @JoinColumn()
    server: Server;
}