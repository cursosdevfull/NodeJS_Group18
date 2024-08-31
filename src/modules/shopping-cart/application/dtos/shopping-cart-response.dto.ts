import { ShoppingCart } from "../../domain/roots/shopping-cart";

export type TProduct = {
  productId: string;
  quantity: number;
  price: number;
};

export type TProducts = TProduct[];

export class ShoppingCartResponse {
  cartId!: string;
  items!: TProducts;
}

export class ShoppingCartResponseDto {
  static fromDomainToRespose(
    domain: ShoppingCart | ShoppingCart[]
  ): ShoppingCartResponse | ShoppingCartResponse[] {
    if (Array.isArray(domain)) {
      return domain.map(
        (item) => this.fromDomainToRespose(item) as ShoppingCartResponse
      );
    }
    const response = new ShoppingCartResponse();
    response.cartId = domain.properties.cartId;
    response.items = domain.properties.items.map((item) => ({
      productId: item.properties.productId,
      quantity: item.properties.quantity,
      price: item.properties.price,
    }));
    return response;
  }
}
