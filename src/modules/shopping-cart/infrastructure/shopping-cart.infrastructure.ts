import { ResultPage } from "../../../core/domain/repositories/base.repository";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { Products, ShoppingCart } from "../domain/roots/shopping-cart";

export class ShoppingCarInfrastructure implements ShoppingCartRepository {
  getAvailableProductsInCart(products: Products): Promise<Products> {
    throw new Error("Method not implemented.");
  }
  insert(entity: ShoppingCart): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getOne(id: string): Promise<ShoppingCart | null> {
    throw new Error("Method not implemented.");
  }
  delete(entity: ShoppingCart): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getAll(): Promise<ShoppingCart[]> {
    throw new Error("Method not implemented.");
  }
  getByPage(page: number, limit: number): Promise<ResultPage<ShoppingCart>> {
    throw new Error("Method not implemented.");
  }
  update(entity: ShoppingCart): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
