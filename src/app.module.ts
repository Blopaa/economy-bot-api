import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerController } from './controllers/server.controllers';
import { UserController } from './controllers/user.controllers';
import { VerifyBotToken } from './middlewares/verifyBotToken.middleware';
import { pgConfig } from './orm.config';
import { ServerServices } from './services/server.services';
import { UserServices } from './services/user.services';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
  ],
  controllers: [UserController, ServerController],
  providers: [UserServices, ServerServices],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyBotToken)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
