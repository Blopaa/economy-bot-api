import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class UserServices {
  async createUser(newUser: User): Promise<void> {
    const user = await getRepository('User').create(newUser);
    await getRepository(User).save(user);
  }
}
