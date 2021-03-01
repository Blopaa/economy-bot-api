import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
const morgan = require('morgan')
import { ServerController } from './controllers/server.controllers';
import { ServerSettingsController } from './controllers/serverSettings.controllers';
import { UserController } from './controllers/user.controllers';
import { userServerController } from './controllers/user_server.controllers';
import { VerifyBotToken } from './middlewares/verifyBotToken.middleware';
import { pgConfig } from './orm.config';
import { ServerServices } from './services/server.services';
import { ServerSettingsServices } from './services/serverSettings.services';
import { UserServices } from './services/user.services';
import { UserServerServices } from './services/user_server.services';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
  ],
  controllers: [UserController, ServerController, ServerSettingsController, userServerController],
  providers: [UserServices, ServerServices, ServerSettingsServices, UserServerServices],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev'), VerifyBotToken)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
