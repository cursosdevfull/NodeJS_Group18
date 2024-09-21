import path from 'node:path';

export class Parameters {
  static get environment(): string {
    return process.env.NODE_ENV || "development";
  }

  static get port(): number {
    return Number(process.env.PORT || 3000);
  }

  static get dbConfig() {
    let dbSynchronize;
    if (process.env.DB_SYNCHRONIZE) {
      dbSynchronize = process.env.DB_SYNCHRONIZE === "true" ? true : false;
    } else {
      dbSynchronize = false;
    }

    let dbLogging;
    if (process.env.DB_LOGGING) {
      dbLogging = process.env.DB_LOGGING === "true" ? true : false;
    } else {
      dbLogging = false;
    }

    const obj = {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_PASSWORD || "12345",
      database: process.env.DB_NAME || "db",
      synchronize: dbSynchronize,
      logging: dbLogging,
      entities: [
        path.join(__dirname, "../..", "/**/entities/**/*.entity{.ts,.js}"),
      ],
    };

    console.log("obj", obj);

    return obj;
  }

  static get jwtSecret(): string {
    return process.env.JWT_SECRET || "secret";
  }

  static get jwtAccessTokenExpiration(): string {
    return process.env.JWT_ACCESS_TOKEN_EXPIRATION || "1h";
  }
}
