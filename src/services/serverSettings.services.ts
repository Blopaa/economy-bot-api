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
    server: Server,
  ): Promise<void | Error> {
    try {
      const serverSettings = await getRepository(ServerSettings)
        .findOneOrFail(server.serverSettings.id)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.BAD_REQUEST,
            'server settings not found',
          );
        });

      serverSettings[configColumn.columnName] = configColumn.newValue;
      getRepository(ServerSettings).save(serverSettings);
    } catch (err) {
      throw err;
    }
  }

  async getConfigColumn(nameColumn: string, server: Server): Promise<{}> {
    try {
      const serverSettings = await getRepository(ServerSettings)
        .findOneOrFail(server.serverSettings.id)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.BAD_REQUEST,
            'server settings not found',
          );
        });
      return serverSettings[nameColumn];
    } catch (err) {
      throw err;
    }
  }
}
