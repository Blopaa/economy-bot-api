import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../entities/baseEntity.entity";
import { ServerSettings } from "../../server-settings/entities/server-settings.entity";
import { UserServer } from "../../entities/user_server.entity";

@Entity('server')
export class Server extends BaseEntity {
    @Column()
    name: string;
    @Column({unique: true})
    serverId: string;
    @OneToMany(() => UserServer, us => us.server)
    userServer: UserServer[];
    @OneToOne(() => ServerSettings, ss => ss.server)
    @JoinColumn()
    serverSettings: ServerSettings;
}