import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { Role } from "../../modules/user/domain/entities/role";
import { Parameters } from "../parameters/parameters";

export function AuthorizationMiddleware(...rolesAllowed: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const accessToken = authorization.split(" ")[1];
    const payload = jwt.verify(
      accessToken,
      Parameters.jwtSecret
    ) as jwt.JwtPayload;

    if (
      payload.roles
        .map((role: Role) => role.name)
        .some((roleName: string) => rolesAllowed.includes(roleName))
    ) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}

/* export function AuthorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const accessToken = authorization.split(" ")[1];
  const payload = jwt.verify(
    accessToken,
    Parameters.jwtSecret
  ) as jwt.JwtPayload;
  if (payload.roles.map((role: Role) => role.name).includes("SUPERADMIN")) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
  //const accessToken = res.locals.token;
} */
