import { Injectable } from '@nestjs/common';
import { Server } from 'src/entities/server.entity';
import { ServerSettings } from 'src/entities/ServerSettings.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ServerServices {
  async createServer(newServer: Server): Promise<void | Error> {
    try {
      const server = (await getRepository(Server).create(newServer)) as Server;
      const serverSettings = (await getRepository(
        'ServerSettings',
      ).create()) as ServerSettings;
      await getRepository(ServerSettings).save(serverSettings);

      server.serverSettings = serverSettings;
      await getRepository(Server).save(server);
    } catch (err) {
      return err;
    }
  }
}
