import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { Server } from 'src/entities/server.entity';
import { User } from 'src/entities/user.entity';
import { UserServer } from 'src/entities/user_server.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserServerServices {
  async create(server: Server, user: User): Promise<void> {
    try {
      if (
        await getRepository(UserServer).findOne({
          where: { server: server, user: user },
        })
      ) {
        throw new ErrorDto(HttpStatus.BAD_REQUEST, 'userServer alredy created');
      }

      const userServer = await getRepository(UserServer).create();

      userServer.server = server;
      userServer.user = user;
      userServer.coins = 0;
      await getRepository(UserServer)
        .save(userServer)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.BAD_REQUEST,
            "couldn't save succesfully",
          );
        });
    } catch (err) {
      throw err;
    }
  }
  async updateCoins(
    server: Server,
    user: User,
    body: { customCoinsSet: number },
  ): Promise<void | Error> {
    try {
      const userServer = await getRepository(UserServer)
        .findOneOrFail({
          where: { server: server, user: user },
        })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            "relation between sever and user wasn't found",
          );
        });
      if (!body.customCoinsSet) {
        (await userServer).coins += 1;
      } else {
        (await userServer).coins += body.customCoinsSet;
      }
      getRepository(UserServer)
        .save(userServer)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "couldn't update coins",
          );
        });
    } catch (err) {
      throw err;
    }
  }

  async shareCoins(
    server: Server,
    payer: User,
    payed: User,
    customCoinsSet: number,
  ): Promise<void> {
    try {
      const payerUserServer = await getRepository(UserServer)
        .findOneOrFail({ where: { server: server, user: payer } })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'payer userSever relation not found',
          );
        });
      const payedUserServer = await getRepository(UserServer)
        .findOneOrFail({
          where: { server: server, user: payed },
        })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'payerd userServer relation not found',
          );
        });

      if (payerUserServer.coins >= customCoinsSet && customCoinsSet >= 0) {
        payerUserServer.coins -= customCoinsSet;
        payedUserServer.coins += customCoinsSet;
        await getRepository(UserServer).save(payedUserServer);
        await getRepository(UserServer).save(payerUserServer);
      } else {
        throw new ErrorDto(
          HttpStatus.BAD_REQUEST,
          'no coins enoguth or the number was under 0',
        );
      }
    } catch (err) {
      throw err;
    }
  }

  async getUserCoins(server: Server, user: User): Promise<{}> {
    try {
      const userServer = await getRepository(UserServer)
        .findOneOrFail({ where: { server: server, user: user } })
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.NOT_FOUND,
            'the relation between the server and the user was not found',
          );
        });

      return { coins: userServer.coins };
    } catch (err) {
      throw err;
    }
  }
}
