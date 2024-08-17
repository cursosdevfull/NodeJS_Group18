export type ResultPage<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type BaseRepository<Domain> = {
  insert(entity: Domain): Promise<void>;
  getOne(id: string): Promise<Domain | null>;
  delete(entity: Domain): Promise<void>;
  getAll(): Promise<Domain[]>;
  getByPage(page: number, limit: number): Promise<ResultPage<Domain>>;
  update(entity: Domain): Promise<void>;
};
