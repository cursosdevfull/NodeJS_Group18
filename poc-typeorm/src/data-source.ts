import "reflect-metadata";

import { DataSource } from "typeorm";

import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";
import { UserEntity } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4000,
  username: "user",
  password: "12345",
  database: "db",
  synchronize: true,
  logging: false,
  entities: [UserEntity, MedicEntity, SpecialtyEntity],
  migrations: [],
  subscribers: [],
});

export const AppDataSource2 = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 4000,
  username: "user",
  password: "12345",
  database: "db",
  synchronize: true,
  logging: false,
  entities: [UserEntity, MedicEntity, SpecialtyEntity],
  migrations: [],
  subscribers: [],
});
