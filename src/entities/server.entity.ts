import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";
import { ServerSettings } from "./ServerSettings.entity";
import { UserServer } from "./user_server.entity";

@Entity('server')
export class Server extends BaseEntity {
    @Column()
    name: string;
    @OneToMany(() => UserServer, us => us.server)
    userServer: UserServer[];
    @OneToOne(() => ServerSettings, ss => ss.server)
    @JoinColumn()
    serverSettings: ServerSettings;
}