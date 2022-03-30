var dbConfig = {
  synchronize: false,
  /**
   * typeORM과 database사이 sync를 맞출것인지에 대한 설정. 필히 개발모드에서만 true로 사용해야한다.
   * 데이터의 싱크를 맞추는 작업이 필요한 경우라면 migration을 통해 데이터의 정합성을 맞춰야한다.
   * https://mulmandu17.tistory.com/69
   */
  migrations: ["migrations/*.js"],
  cli: {
    migrationsDir: "migrations",
  },
};

switch (process.env.NODE_ENV) {
  case "development":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "db.sqlite",
      entities: ["**/*.entity.js"],
    });
    break;
  case "test":
    Object.assign(dbConfig, {
      type: "sqlite",
      database: "test.sqlite",
      entities: ["**/*.entity.ts"],
      migrationsRun: true,
    });
    break;
  case "production":
    Object.assign(dbConfig, {
      type: "postgres",
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ["**/*.entity.js"],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error("Unknown enviroment");
}

module.exports = dbConfig;
