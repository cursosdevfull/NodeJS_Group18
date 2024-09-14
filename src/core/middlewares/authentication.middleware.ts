import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";

import { TokenService } from "../tokens/token.service";

export class AuthenticationMiddleware {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers; // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdG5hbWUiOiJKdWFuIiwicm9sZXMiOlt7InJvbGVJZCI6MSwibmFtZSI6IkFETUlOIn0seyJyb2xlSWQiOjMsIm5hbWUiOiJTVVBFUkFETUlOIn1dLCJpYXQiOjE3MjYzMzE2NzEsImV4cCI6MTcyNjMzMTcwMX0.qdOPejAGxlhyqvgkW14iVnx9QSbsuT5iUh-_t2Htuq0

    if (!authorization) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!authorization.match(/^Bearer .+/)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (authorization.split(" ").length !== 2) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const accessToken = authorization.split(" ")[1];

    try {
      await TokenService.validateAccessToken(accessToken);
      // res.locals.token = accessToken;
      next();
    } catch (error: unknown) {
      if (error instanceof TokenExpiredError) {
        res.status(403).json({ message: "Token expired" });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    }
  }
}
