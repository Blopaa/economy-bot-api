import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserServerService } from './user-server.service';
import { CreateUserServerDto } from './dto/create-user-server.dto';
import { UpdateUserServerDto } from './dto/update-user-server.dto';

@Controller('user-server')
export class UserServerController {
  constructor(private readonly userServerService: UserServerService) {}

  @Post()
  create(@Body() createUserServerDto: CreateUserServerDto) {
    return this.userServerService.create(createUserServerDto);
  }

  @Get()
  findAll() {
    return this.userServerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userServerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserServerDto: UpdateUserServerDto) {
    return this.userServerService.update(+id, updateUserServerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userServerService.remove(+id);
  }
}
