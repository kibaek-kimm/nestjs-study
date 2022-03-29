/* eslint-disable @typescript-eslint/no-var-requires */
import { MiddlewareConsumer, Module, ValidationPipe } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/user.entity";
import { Report } from "./reports/reports.entity";
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: "sqlite",
    //       database: config.get<string>("DB_NAME"),
    //       entities: [User, Report],
    //       synchronize: true,
    //       /**
    //        * typeORM과 database사이 sync를 맞출것인지에 대한 설정. 필히 개발모드에서만 true로 사용해야한다.
    //        * 데이터의 싱크를 맞추는 작업이 필요한 경우라면 migration을 통해 데이터의 정합성을 맞춰야한다.
    //        * https://mulmandu17.tistory.com/69
    //        */
    //     };
    //   },
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private confingService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.confingService.get("COOKIE_KEY")],
        }),
      )
      .forRoutes("*");
  }
}
