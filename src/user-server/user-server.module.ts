import { Module } from '@nestjs/common';
import { UserServerService } from './user-server.service';
import { UserServerController } from './user-server.controller';

@Module({
  controllers: [UserServerController],
  providers: [UserServerService]
})
export class UserServerModule {}
