import { err, ok, Result } from "neverthrow";
import { In, IsNull } from "typeorm";

import { DatabaseBootstrap } from "../../../bootstrap/database.bootstrap";
import { ResultPage } from "../../../core/domain/repositories/base.repository";
import { RoleEntity } from "../../role/infrastructure/typeorm/entities/role.entity";
import { UserRepository } from "../domain/repositories/user.repository";
import { User } from "../domain/roots/user";
import { UserDto } from "./dtos/user.dto";
import {
  UserFindAllDatabaseException,
  UserFindDatabaseException,
  UserGetByPageDatabaseException,
  UserSaveDatabaseException,
} from "./exceptions/user.exception";
import { UserEntity } from "./typeorm/entities/user.entity";

export type SaveUserResult = Result<User, UserSaveDatabaseException>;
export type FindUserResult = Result<
  User | undefined,
  UserFindDatabaseException
>;
export type FindAllUserResult = Result<User[], UserFindAllDatabaseException>;
export type GetByPageResult = Result<
  ResultPage<User>,
  UserGetByPageDatabaseException
>;

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<SaveUserResult> {
    try {
      const userRepository =
        DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const roleRepository =
        DatabaseBootstrap.dataSource.getRepository(RoleEntity);
      const entity = UserDto.fromDomainToData(user) as UserEntity;
      entity.roles = await roleRepository.findBy({
        roleId: In(user.properties.roles),
      });
      const userEntityCreated = await userRepository.save(entity);
      const userCreated = UserDto.fromDataToDomain(userEntityCreated) as User;
      return ok(userCreated);
    } catch (error: unknown) {
      return err(new UserSaveDatabaseException());
    }
  }
  async findByEmail(email: string): Promise<FindUserResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const data = await repository.findOne({
        where: { email, deletedAt: IsNull() },
        relations: ["roles"],
      });
      const user = data ? (UserDto.fromDataToDomain(data) as User) : undefined;
      return ok(user);
    } catch (error: unknown) {
      return err(new UserFindDatabaseException());
    }
  }

  async findById(userId: number): Promise<FindUserResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const data = await repository.findOne({
        where: { userId, deletedAt: IsNull() },
        relations: ["roles"],
      });
      const user = data ? (UserDto.fromDataToDomain(data) as User) : undefined;
      return ok(user);
    } catch (error: unknown) {
      return err(new UserFindDatabaseException());
    }
  }

  async findByRefreshToken(refreshToken: string): Promise<FindUserResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const data = await repository.findOne({
        where: { refreshToken, deletedAt: IsNull() },
        relations: ["roles"],
      });
      const user = data ? (UserDto.fromDataToDomain(data) as User) : undefined;
      return ok(user);
    } catch (error: unknown) {
      return err(new UserFindDatabaseException());
    }
  }

  async findAll(): Promise<FindAllUserResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const data = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });
      const users = UserDto.fromDataToDomain(data) as User[];
      return ok(users);
    } catch (error: unknown) {
      return err(new UserFindAllDatabaseException());
    }
  }

  async getByPage(page: number, limit: number): Promise<GetByPageResult> {
    try {
      const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
      const [data, total] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        take: limit,
        skip: page * limit,
        relations: ["roles"],
      });

      const users = UserDto.fromDataToDomain(data) as User[];
      const result: ResultPage<User> = {
        data: users,
        total,
        page,
        limit,
      };
      return ok(result);
    } catch (error: unknown) {
      return err(new UserGetByPageDatabaseException());
    }
  }
}
