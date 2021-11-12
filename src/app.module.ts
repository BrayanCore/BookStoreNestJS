import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Configuration } from './config/config.keys';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

const API_KEY = '123456543';
const API_KEY_PROD = 'PROD12345432';

@Module({
  imports: [HttpModule, ConfigModule, DatabaseModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'TASK',
      useFactory: async(http: HttpService) => {

        const tasks = await http.get('https://jsonplaceholder.typicode.com/todos');
        const data = await ( await firstValueFrom(tasks) ).data;

        return data;

      },
      inject: [HttpService]
    }
  ],
})
export class AppModule {

  static port: number | string;

  constructor(
    private readonly _configService: ConfigService
  ) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }

}
