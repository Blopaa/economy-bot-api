import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerServices } from 'src/services/server.services';
import { UserServices } from 'src/services/user.services';
import { UserServerServices } from 'src/services/user_server.services';

@Controller('userserver')
export class userServerController {
  constructor(
    private readonly userServerServices: UserServerServices,
    private readonly serverServices: ServerServices,
    private readonly userServices: UserServices,
  ) {}

  @Post('/add/:serverId/:userId')
  async create(
    @Param('serverId') serverId: string,
    @Param('userId') userId: string,
  ) {
    const server = await this.serverServices.getServerByDiscordId(serverId);
    const user = await this.userServices.getUserByDiscordId(userId);
    await this.userServerServices
      .create(server, user)
      .catch((err: ErrorDto) => {
        throw new HttpException({ message: err.message }, err.status);
      });
  }

  @Put('/coins')
  async updateCoins(
    @Body() body: { customCoinsSet: number; serverId: string; userId: string },
  ) {
    const server = await this.serverServices
      .getServerByDiscordId(body.serverId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
    const user = await this.userServices
      .getUserByDiscordId(body.userId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
    await this.userServerServices
      .updateCoins(server, user, body)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Put('/sharecoins')
  async shareCoins(
    @Body()
    body: {
      customCoinsSet: number;
      payerId: string;
      payedId: string;
      serverId: string;
    },
  ) {
    try {
      const server = await this.serverServices.getServerByDiscordId(
        body.serverId,
      );

      const payed = await this.userServices.getUserByDiscordId(body.payedId);

      const payer = await this.userServices.getUserByDiscordId(body.payerId);

      await this.userServerServices.shareCoins(
        server,
        payer,
        payed,
        body.customCoinsSet,
      );
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Get('/coins/:userId/:serverId')
  async getUserCoins(@Param() params: { serverId: string; userId: string }) {
    const server = await this.serverServices
      .getServerByDiscordId(params.serverId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
    const user = await this.userServices
      .getUserByDiscordId(params.userId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
    return this.userServerServices
      .getUserCoins(server, user)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }
}
