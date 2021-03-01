import { Injectable } from '@nestjs/common';
import { CreateUserServerDto } from './dto/create-user-server.dto';
import { UpdateUserServerDto } from './dto/update-user-server.dto';

@Injectable()
export class UserServerService {
  create(createUserServerDto: CreateUserServerDto) {
    return 'This action adds a new userServer';
  }

  findAll() {
    return `This action returns all userServer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userServer`;
  }

  update(id: number, updateUserServerDto: UpdateUserServerDto) {
    return `This action updates a #${id} userServer`;
  }

  remove(id: number) {
    return `This action removes a #${id} userServer`;
  }
}
