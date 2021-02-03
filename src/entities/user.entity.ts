import {BaseEntity, Column, Entity} from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
    @Column()
    discordId: string;
    @Column()
    discordTag: string;
}