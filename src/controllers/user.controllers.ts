import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
} from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { User } from 'src/entities/user.entity';
import { UserServices } from 'src/services/user.services';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserServices) {}

  @Post('/add')
  @HttpCode(200)
  createUser(@Body() user: User): void {
    this.userService.createUser(user).catch((err: ErrorDto) => {
      throw new HttpException(err.message, err.status);
    });
  }
}
