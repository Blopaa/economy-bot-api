import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { ServerServices } from 'src/services/server.services';

@Controller('server')
export class ServerController {
  constructor(private readonly serverServices: ServerServices) {}
  @Post('/add')
  @HttpCode(200)
  createServer(@Body() server: Server): void {
    this.serverServices.createServer(server).catch((err: ErrorDto) => {
      throw new HttpException({ message: err.message }, err.status);
    });
  }
}
