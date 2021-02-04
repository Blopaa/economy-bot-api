import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './baseEntity.entity';
import { Server } from './server.entity';

@Entity('server_settings')
export class ServerSettings extends BaseEntity {
  @Column()
  embedColor: string;
  @Column()
  prefix: string;
  @Column()
  supportCategoryId: string;
  @Column()
  warningRoleId: string;
  @Column()
  adminRoleId: string;
  @Column()
  guestRoleId: string;
  @Column()
  everyoneRoleId: string;
  @Column()
  suggestionChannelId: string;
  @Column()
  welcomeChannelId: string;

  @OneToOne(() => Server, server => server.serverSettings)
  server: Server;
}
