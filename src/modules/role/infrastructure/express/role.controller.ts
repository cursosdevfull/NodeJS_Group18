import { Request, Response } from "express";

import { RoleGetAllApplication } from "../../application/role-get-all.application";

export class RoleController {
  constructor(private readonly roleGetAllApplication: RoleGetAllApplication) {}

  async getAllRole(req: Request, res: Response) {
    const roleGetAllResult = await this.roleGetAllApplication.execute();

    if (roleGetAllResult.isOk()) {
      res.status(201).json(roleGetAllResult.value);
    } else {
      res.status(500).json({
        message: roleGetAllResult.error.message,
        name: roleGetAllResult.error.name,
        stack: roleGetAllResult.error.stack,
      });
    }
  }
}
