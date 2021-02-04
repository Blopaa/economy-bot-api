import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserServices } from 'src/services/user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @Post('/add')
  @HttpCode(200)
  createUser(@Body() user: User): void {
    if(!user.discordId || !user.discordTag)  throw new HttpException('not enought params, discordId and discordTag required', HttpStatus.BAD_REQUEST);
    this.userService.createUser(user)
  }
}
