import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ResultPage } from "../../../core/domain/repositories/base.repository";
import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { Products, ShoppingCart } from "../domain/roots/shopping-cart";
import { ShoppingCartDto } from "./dtos/shopping-cart.dto";
import { ShoppingCartEntity } from "./entities/shopping-cart.entity";

export class ShoppingCartInfrastructure implements ShoppingCartRepository {
  getAvailableProductsInCart(products: Products): Promise<Products> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: ShoppingCart): Promise<void> {
    try {
      const data = ShoppingCartDto.fromDomainToData(
        entity
      ) as ShoppingCartEntity;
      const repository =
        DatabaseBootstrap.dataSource.getRepository(ShoppingCartEntity);
      await repository.save(data);
    } catch (error) {
      throw new Error(
        "An error occurred while trying to insert the shopping cart"
      );
    }
  }

  async getOne(id: string): Promise<ShoppingCart | null> {
    try {
      const repository =
        DatabaseBootstrap.dataSource.getRepository(ShoppingCartEntity);
      const data = await repository.findOne({
        where: { shoppingCartId: id },
        relations: ["items"],
      });
      if (!data) return null;
      const domain = ShoppingCartDto.fromDataToDomain(data) as ShoppingCart;
      return domain;
    } catch (error) {
      throw new Error(
        "An error occurred while trying to get the shopping cart"
      );
    }
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
