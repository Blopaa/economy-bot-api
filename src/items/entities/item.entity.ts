import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Store } from 'src/store/entities/store.entity';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column()
  mesage: string;
  @Column()
  type: 'other' | 'role';
  @ManyToOne(() => Store, (store) => store.item)
  store: Store;
  @ManyToMany(() => UserServer, (userServer) => userServer.item)
  userServer: UserServer[];
}
