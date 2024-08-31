import { ShoppingCartRepository } from "../domain/repositories/shopping-cart.repository";
import { ShoppingCartResponseDto } from "./dtos/shopping-cart-response.dto";

export class ShoppingCartGetOneApplication {
  constructor(private readonly repository: ShoppingCartRepository) {}

  async execute(cartId: string) {
    const domain = await this.repository.getOne(cartId);
    if (!domain) {
      return null;
    }

    return ShoppingCartResponseDto.fromDomainToRespose(domain);
  }
}
