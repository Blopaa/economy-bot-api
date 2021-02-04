import {Column, Entity} from 'typeorm';
import { BaseEntity } from './baseEntity.entity';

@Entity('user')
export class User extends BaseEntity {
    @Column()
    discordId: string;
    @Column()
    discordTag: string;
}