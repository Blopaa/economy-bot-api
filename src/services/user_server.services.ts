import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { User } from 'src/entities/user.entity';
import { UserServer } from 'src/entities/user_server.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserServerServices {
  async create(serverId: string, userId: string): Promise<void | ErrorEvent> {
    try {
      const userServer = await getRepository(UserServer).create();
      const server = await getRepository(Server)
        .findOneOrFail({
          where: { serverId: serverId },
        })
        .catch((err) => {
            console.log(err)
          throw new ErrorDto(HttpStatus.BAD_REQUEST, "server not found");
        });

      const user = await getRepository(User)
        .findOneOrFail({ where: { discordId: userId } })
        .catch(() => {
          throw new ErrorDto(HttpStatus.BAD_REQUEST, "user not found");
        });

      userServer.server = server;
      userServer.user = user;
      userServer.coins = 0;
      await getRepository(UserServer)
        .save(userServer)
        .catch(() => {
          throw new ErrorDto(HttpStatus.BAD_REQUEST, "couldn't save succesfully");
        });
    } catch (err) {
      throw err;
    }
  }
  async updateCoins(serverId: string, userId: string): Promise<void | Error> {
    const userServer = getRepository(UserServer).findOne({
      where: { server: serverId, user: userId },
    });
  }
}
