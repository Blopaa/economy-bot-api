import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { ServerSettings } from 'src/entities/ServerSettings.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class ServerServices {
  async createServer(newServer: Server): Promise<void> {
    try {
      if (!newServer)
        throw new ErrorDto(
          HttpStatus.BAD_REQUEST,
          'not enought data, server must have discordId and name',
        );
      const server = await getRepository(Server).create(newServer);
      await getRepository(Server)
        .save(server)
        .catch(() => {
          throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
        });
      const serverSettings = await getRepository(ServerSettings).create();
      await getRepository(ServerSettings)
        .save(serverSettings)
        .catch(() => {
          throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
        });

      server.serverSettings = serverSettings;
      await getRepository(Server)
        .save(server)
        .catch(() => {
          throw new ErrorDto(HttpStatus.CONFLICT, 'server alredy created');
        });
    } catch (err) {
      throw err;
    }
  }

  async getServerByDiscordId(serverId: string): Promise<Server> {
    try {
      const server = getRepository(Server)
        .findOneOrFail({ where: { serverId: serverId }, relations: ['serverSettings'] })
        .catch(() => {
          throw new ErrorDto(HttpStatus.NOT_FOUND, 'server not found');
        });

      return server;
    } catch (err) {}
  }
}
