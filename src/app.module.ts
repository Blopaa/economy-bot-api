import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
const morgan = require('morgan')
import { VerifyBotToken } from './middlewares/verifyBotToken.middleware';
import { pgConfig } from './orm.config';
import { UserModule } from './user/user.module';
import { ServerModule } from './server/server.module';
import { ServerSettingsModule } from './server-settings/server-settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(pgConfig),
    ConfigModule.forRoot({
      envFilePath: '.dev.env',
      isGlobal: true,
    }),
    UserModule,
    ServerModule,
    ServerSettingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(morgan('dev'), VerifyBotToken)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
