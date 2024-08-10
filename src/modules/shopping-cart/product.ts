import { validate } from "uuid";

export class Product {
  private productId: string;
  private quantity: number;
  private price: number;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

  constructor(
    productId: string,
    quantity: number,
    price: number,
    createdAt: Date,
    updatedAt?: Date,
    deletedAt?: Date
  ) {
    if (!validate(productId)) throw "Invalid productId";
    if (quantity <= 0) throw "Quantity should be greater than 0";
    if (price < 0) throw "Price should be greater than 0";

    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
}
