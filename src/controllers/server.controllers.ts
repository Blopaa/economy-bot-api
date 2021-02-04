import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { ServerServices } from 'src/services/server.services';

@Controller('server')
export class ServerController {
  constructor(private readonly serverServices: ServerServices) {}
  @Post('/add')
  createServer(@Body() server: Server): void {
    this.serverServices.createServer(server).catch((err: ErrorDto) => {
      throw new HttpException({ message: err.message }, err.status);
    });
  }
  @Get('/:serverId')
  getServerByDiscordId(@Param('serverId') serverId: string) {
    this.serverServices
      .getServerByDiscordId(serverId)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }
}
