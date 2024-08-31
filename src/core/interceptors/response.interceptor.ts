import { NextFunction, Request, Response } from "express";

export const ResponseInterceptor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const originalJson = response.json;

  response.json = function (data) {
    if (!data) return originalJson.call(this, { message: "No data found" });

    return originalJson.call(this, {
      provider: "CursosDev",
      status: "success",
      result: data,
    });
  };

  next();
};
