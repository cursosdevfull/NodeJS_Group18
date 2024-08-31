import { DataSource } from "typeorm";

import { Parameters } from "../core/parameters/parameters";
import { Bootstrap } from "./bootstrap";

export class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<DataSource> {
    const dbConfig = Parameters.dbConfig;
    const appDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    DatabaseBootstrap.appDataSource = appDataSource;

    const init = appDataSource.initialize();
    init.then(() =>
      console.log(
        `Database initialized running on ${dbConfig.host}:${dbConfig.port}`
      )
    );
    return init;
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }
}
