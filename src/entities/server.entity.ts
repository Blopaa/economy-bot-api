import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";
import { UserServer } from "./user_server.entity";

@Entity('server')
export class Server extends BaseEntity {
    @Column()
    name: string;
    @OneToMany(() => UserServer, us => us.server)
    userServer: UserServer[];
}