import { Body, Controller, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { ServerSettingsServices } from 'src/services/serverSettings.services';

@Controller('serversettings')
export class ServerSettingsController {
  constructor(
    private readonly serverSettingsServices: ServerSettingsServices,
  ) {}
  @Put('/:id')
  setConfigColumn(
    @Body() configColumn: ConfigColumnDto,
    @Param('id') id: string
  ) {
    this.serverSettingsServices.setConfigColumn(configColumn, id).catch((err: ErrorDto) => {
        throw new HttpException(err.message, err.status);
    });
  }
}
