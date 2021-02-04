import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Server } from 'src/entities/server.entity';
import { ServerServices } from 'src/services/server.services';

@Controller('server')
export class ServerController {
  constructor(private readonly serverServices: ServerServices) {}
  @Post('/add')
  @HttpCode(200)
  createServer(@Body() server: Server): void {
    if (!server.name) {
      throw new HttpException('bad Request', HttpStatus.BAD_REQUEST);
    }

    this.serverServices.createServer(server).catch((err) => {
      throw new HttpException({ message: err.message }, HttpStatus.BAD_REQUEST);
    });
  }
}
