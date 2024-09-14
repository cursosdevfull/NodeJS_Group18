import {
  FindAllUserResult,
  FindUserResult,
  GetByPageResult,
  SaveUserResult,
} from "../../infrastructure/user.infrastructure";
import { User } from "../roots/user";

export type UserRepository = {
  save(user: User): Promise<SaveUserResult>;
  findByEmail(email: string): Promise<FindUserResult>;
  findById(userId: number): Promise<FindUserResult>;
  findByRefreshToken(refreshToken: string): Promise<FindUserResult>;
  findAll(): Promise<FindAllUserResult>;
  getByPage(page: number, limit: number): Promise<GetByPageResult>;
};
