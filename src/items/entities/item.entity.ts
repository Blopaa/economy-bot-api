import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Store } from 'src/store/entities/store.entity';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column()
  message:string
  @Column()
  type: 'no role' | 'role';
  @ManyToOne(() => Store, (store) => store.items)
  @JoinColumn()
  store: Store;
  @ManyToMany(() => UserServer, (userServer) => userServer.item)
  userServer: UserServer[];
}
