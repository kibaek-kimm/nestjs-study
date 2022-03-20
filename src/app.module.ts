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
import { Reports } from "./reports/reports.entity";
const cookieSession = require("cookie-session");

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config);
        return {
          type: "sqlite",
          database: config.get<string>("DB_NAME"),
          entities: [User, Reports],
          synchronize: true,
        };
      },
    }),
<<<<<<< HEAD:src/server/app.module.ts
=======
    // TypeOrmModule.forRoot({
    //   type: "sqlite",
    //   database: process.env.DB_NAME,
    //   entities: [User, Reports],
    //   synchronize: true,
    // }),
>>>>>>> parent of fd38ddb (feat: server로직과 client로직 분리):src/app.module.ts
    UsersModule,
    ReportsModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ["secret-key"],
        }),
      )
      .forRoutes("*");
  }
}
