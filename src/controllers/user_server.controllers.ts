import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { UserServerServices } from 'src/services/user_server.services';

@Controller('userserver')
export class userServerController {
  constructor(private readonly userServerServices: UserServerServices) {}

  @Post('/add/:serverId/:userId')
  async create(@Param('serverId') serverId: string, @Param('userId') userId: string) {
    await this.userServerServices.create(serverId, userId).catch((err: ErrorDto) => {
      throw new HttpException({ message: err.message }, err.status);
    });
  }

  @Put('/:serverId/:userId')
  updateCoins(@Param() serverId: string, @Param() userId: string) {
    this.userServerServices.updateCoins(serverId, userId);
  }
}
