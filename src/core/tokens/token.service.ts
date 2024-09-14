import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { Role } from "../../modules/user/domain/entities/role";
import { Parameters } from "../parameters/parameters";

export class TokenService {
  static generateAccessToken(firstname: string, roles: Role[]): string {
    const payload = { firstname, roles };
    return jwt.sign(payload, Parameters.jwtSecret, {
      expiresIn: Parameters.jwtAccessTokenExpiration,
    });
  }

  static async validateAccessToken(
    accessToken: string
  ): Promise<jwt.JwtPayload | string> {
    return jwt.verify(accessToken, Parameters.jwtSecret);
  }

  static generateNewRefreshToken(): string {
    return uuidv4();
  }
}
