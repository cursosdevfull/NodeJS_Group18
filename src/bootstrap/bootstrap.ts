import { DataSource } from "typeorm";

type TInitialize = boolean | DataSource | string | Error;

export type Bootstrap = {
  initialize: () => Promise<TInitialize>;
};
