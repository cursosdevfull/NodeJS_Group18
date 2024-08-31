import { Product } from "../../domain/entities/product";
import { CartProperties, ShoppingCart } from "../../domain/roots/shopping-cart";
import { ShoppingCartFactory } from "../../domain/roots/shopping-cart.factory";
import { ShoppingCartItemEntity } from "../entities/shopping-cart-item.entity";
import { ShoppingCartEntity } from "../entities/shopping-cart.entity";

export class ShoppingCartDto {
  static fromDomainToData(
    domain: ShoppingCart | ShoppingCart[]
  ): ShoppingCartEntity | ShoppingCartEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((item) =>
        this.fromDomainToData(item)
      ) as ShoppingCartEntity[];
    }

    const data = new ShoppingCartEntity();
    data.shoppingCartId = domain.properties.cartId;
    data.items = domain.properties.items.map((item) => {
      const data = new ShoppingCartItemEntity();
      data.productId = item.properties.productId;
      data.quantity = item.properties.quantity;
      data.price = item.properties.price;
      data.createdAt = item.properties.createdAt;
      if (item.properties.updatedAt) {
        data.updatedAt = item.properties.updatedAt;
      }
      if (item.properties.deletedAt) {
        data.deletedAt = item.properties.deletedAt;
      }
      return data;
    });
    data.createdAt = domain.properties.createdAt;
    if (domain.properties.updatedAt) {
      data.updatedAt = domain.properties.updatedAt;
    }
    if (domain.properties.deletedAt) {
      data.deletedAt = domain.properties.deletedAt;
    }

    return data;
  }

  static fromDataToDomain(
    data: ShoppingCartEntity | ShoppingCartEntity[]
  ): ShoppingCart | ShoppingCart[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as ShoppingCart[];
    }

    const props: CartProperties = {
      cartId: data.shoppingCartId,
      items: data.items.map((item) => {
        return new Product(
          item.productId,
          item.quantity,
          item.price,
          item.createdAt,
          item.updatedAt,
          item.deletedAt
        );
      }),
    };

    return ShoppingCartFactory.create(props);
  }
}
