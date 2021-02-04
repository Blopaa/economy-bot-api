import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { ServerSettings } from 'src/entities/ServerSettings.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ServerServices {
  async createServer(newServer: Server): Promise<void | Error> {
    try {
      if (!newServer)
        throw new ErrorDto(
          HttpStatus.BAD_REQUEST,
          'not enought data, server must have discordId and name',
        );
      const server = await getRepository(Server).create(newServer);
      const serverSettings = await getRepository(ServerSettings).create();
      await getRepository(ServerSettings).save(serverSettings);

      server.serverSettings = serverSettings;
      await getRepository(Server).save(server);
    } catch (err) {
      throw err;
    }
  }
}
