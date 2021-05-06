import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemsService } from 'src/items/items.service';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import { UserServerService } from 'src/user-server/user-server.service';
import { Repository } from 'typeorm';
import { CreateUserServerItemDto } from './dto/create-user-server-item.dto';
import { UpdateUserServerItemDto } from './dto/update-user-server-item.dto';
import { UserServerItem } from './entities/user-server-item.entity';

@Injectable()
export class UserServerItemService {
  constructor(
    @InjectRepository(UserServerItem)
    private userServerItemRepository: Repository<UserServerItem>,

    @InjectRepository(UserServer)
    private userServerRepository: Repository<UserServer>,

    @Inject(UserServerService)
    private userServerServices: UserServerService,

    @Inject(ItemsService)
    private itemService: ItemsService,
  ) {}

  async buyItems({
    serverId,
    userId,
    itemId,
  }: {
    serverId: string;
    userId: string;
    itemId: string;
  }) {
    const userServer = await this.userServerServices.findOne(userId, serverId);
    const item = await this.itemService.findOne(+itemId);
    const prev = await this.userServerItemRepository.findOne({
      where: { userServer, item },
    });
    if (item.type === 'role') return;

    if (prev) {
      prev.quantity++;
      this.userServerItemRepository.save(prev);
    } else {
      const userServerItem = this.userServerItemRepository.create();
      userServerItem.item = item;
      userServerItem.userServer = userServer;
      userServer.coins -= item.price;
      userServerItem.quantity = 1;
      await this.userServerRepository.save(userServer);
      this.userServerItemRepository.save(userServerItem);
    }
  }

  // async useItems({ serverId, userId, itemId }) {
  //   const userServer = await this.findOne(userId, serverId);
  //   const item = userServer.item.find((e) => e.id === itemId);
  //   userServer.item = userServer.item.filter((e) => e.id != item.id);

  //   return item;
  // }

  // create(createUserServerItemDto: CreateUserServerItemDto) {
  //   return 'This action adds a new userServerItem';
  // }

  // findAll() {
  //   return `This action returns all userServerItem`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} userServerItem`;
  // }

  // update(id: number, updateUserServerItemDto: UpdateUserServerItemDto) {
  //   return `This action updates a #${id} userServerItem`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userServerItem`;
  // }
}
