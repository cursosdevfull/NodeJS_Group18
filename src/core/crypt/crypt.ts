import * as bcrypt from "bcryptjs";

export class Crypt {
  static async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
