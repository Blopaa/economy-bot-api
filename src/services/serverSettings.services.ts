import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigColumnDto } from 'src/dto/configColumn.dto';
import { Server } from 'src/entities/server.entity';
import { ServerSettings } from 'src/entities/ServerSettings.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ServerSettingsServices {
  async setConfigColumn(
    configColumn: ConfigColumnDto,
    id: string,
  ): Promise<void | Error> {
    const { columnName, newValue } = configColumn;
    const serverSettings = (
      await getRepository(Server).findOne(id, { relations: ['serverSettings'] })
    ).serverSettings;
    
      try {
        serverSettings[columnName] = newValue;
        getRepository(ServerSettings).save(serverSettings);
      } catch (err) {
          return err
      }    
  }
}
