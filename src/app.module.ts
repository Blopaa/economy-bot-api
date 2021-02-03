import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {pgConfig} from './orm.config'
import { UserServices } from './services/user.services';

@Module({
  imports: [TypeOrmModule.forRoot(pgConfig)],
  controllers: [],
  providers: [UserServices]
})
export class AppModule {}
