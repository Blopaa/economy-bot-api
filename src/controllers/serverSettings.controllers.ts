import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerServices } from 'src/services/server.services';
import { ServerSettingsServices } from 'src/services/serverSettings.services';

@Controller('serversettings')
export class ServerSettingsController {
  constructor(
    private readonly serverSettingsServices: ServerSettingsServices,
    private readonly serverServices: ServerServices,
  ) {}
  @Put('/:id')
  async setConfigColumn(
    @Body() configColumn: ConfigColumnDto,
    @Param('id') id: string,
  ) {
    const server = await this.serverServices.getServerByDiscordId(id);
    this.serverSettingsServices
      .setConfigColumn(configColumn, server)
      .catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
      });
  }

  @Get('/column/:serverId/:colunmName')
  async getConfigColumn(
    @Param('serverId') serverId: string,
    @Param('colunmName') columnName: string,
  ) {
    const server = await this.serverServices.getServerByDiscordId(serverId);
    return this.serverSettingsServices.getConfigColumn(columnName, server);
  }
}
