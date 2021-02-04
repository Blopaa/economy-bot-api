import { Column, Entity } from "typeorm";
import { BaseEntity } from "./baseEntity.entity";

@Entity('server')
export class Server extends BaseEntity {
    @Column()
    name: string;
}