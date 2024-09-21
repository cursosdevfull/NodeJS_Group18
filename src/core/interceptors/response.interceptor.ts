import { NextFunction, Request, Response } from 'express';

import { Parameters } from '../parameters/parameters';

export enum STATUS_CODE_ID {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  BAD_REQUEST = "BAD_REQUEST",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHENTICATED = "UNAUTHENTICATED",
  FORBIDDEN = "FORBIDDEN",
  OK = "OK",
}

export const ResponseInterceptor = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const originalJson = response.json;

  response.json = function (data) {
    const statusCode = response.statusCode;
    if (!data) return originalJson.call(this, { message: "No data found" });

    if (statusCode === 200 || statusCode === 201) {
      return originalJson.call(this, {
        provider: "CursosDev",
        status: "success",
        statusCodeId: STATUS_CODE_ID.OK,
        statusCode,
        result: { response: data },
      });
    } else if (statusCode >= 400 && statusCode < 600) {
      return originalJson.call(this, {
        provider: "CursosDev",
        status: "failure",
        statusCodeId:
          statusCode >= 400 && statusCode < 500
            ? STATUS_CODE_ID.BAD_REQUEST
            : STATUS_CODE_ID.INTERNAL_SERVER_ERROR,
        statusCode,
        detail: {
          name: data.name,
          message: data.message,
          stack:
            Parameters.environment !== "production" ? data.stack : undefined,
        },
      });
    }
  };

  next();
};
