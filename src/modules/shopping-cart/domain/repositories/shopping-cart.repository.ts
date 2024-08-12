type Repository = {
  getAvailableProductsInCart: (products: Products) => Promise<Products>;
  insertCart: (cart: ShoppingCart) => Promise<void>;
};
export type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
  delete: (cart: ShoppingCart) => Promise<void>;
};
type Repository = {
  getAll: () => Promise<ShoppingCart[]>;
};

type ResultPage<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

type Repository = {
  getByPage: (page: number, limit: number) => Promise<ResultPage<ShoppingCart>>;
};

type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
};

type Repository = {
  getOne: (cartId: string) => Promise<ShoppingCart | null>;
  getAvailableProductsInCart: (products: Products) => Promise<Products>;
  update: (cart: ShoppingCart) => Promise<void>;
};
