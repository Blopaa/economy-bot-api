import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from 'src/server/entities/server.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Server])],
  controllers: [ServerController],
  providers: [ServerService],
  exports: [ServerService]
})
export class ServerModule {}
