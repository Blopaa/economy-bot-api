import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Item } from 'src/items/entities/item.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';

@Entity()
export class Store extends BaseEntity {
  @OneToOne(() => Server, (server) => server.store)
  server: Server;
  @ManyToOne(() => Item, (item) => item.store)
  @JoinColumn()
  item: Item[];
}