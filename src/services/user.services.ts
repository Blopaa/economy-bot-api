import { HttpStatus, Injectable } from '@nestjs/common';
import { ErrorDto } from 'src/dto/error.dto';
import { User } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserServices {
  async createUser(newUser: User): Promise<void> {
    try {
      const user = await getRepository('User').create(newUser);
      await getRepository(User)
        .save(user)
        .catch(() => {
          throw new ErrorDto(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "couldn't save user, maybe not providing all data needed",
          );
        });
    } catch (err) {
      throw err;
    }
  }
}
