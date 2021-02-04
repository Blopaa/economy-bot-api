import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { ServerSettings } from 'src/entities/ServerSettings.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ServerSettingsServices {
  async setConfigColumn(
    configColumn: ConfigColumnDto,
    id: string,
  ): Promise<void | Error> {
    try {
      const serverSettings = (
        await getRepository(Server).findOne(id, {
          relations: ['serverSettings'],
        })
      ).serverSettings;

      if(!serverSettings) throw new ErrorDto(HttpStatus.NOT_FOUND, "server settings not found")

      serverSettings[configColumn.columnName] = configColumn.newValue;
      getRepository(ServerSettings).save(serverSettings);
    } catch (err) {
      throw err;
    }
  }
}
