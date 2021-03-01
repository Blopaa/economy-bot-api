import { Module } from '@nestjs/common';
import { UserServerService } from './user-server.service';
import { UserServerController } from './user-server.controller';
import { ServerModule } from 'src/server/server.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ServerModule, UserModule],
  controllers: [UserServerController],
  providers: [UserServerService]
})
export class UserServerModule {}
