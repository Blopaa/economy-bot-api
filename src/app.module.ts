import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controllers';
import {pgConfig} from './orm.config'
import { UserServices } from './services/user.services';

@Module({
  imports: [TypeOrmModule.forRoot(pgConfig)],
  controllers: [UserController],
  providers: [UserServices]
})
export class AppModule {}
