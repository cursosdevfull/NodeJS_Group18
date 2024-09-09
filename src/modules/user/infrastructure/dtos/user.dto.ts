import { Role } from "../../domain/entities/role";
import { User, UserProps } from "../../domain/roots/user";
import { UserEntity } from "../typeorm/entities/user.entity";

export class UserDto {
  static fromDomainToData(domain: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((el) => UserDto.fromDomainToData(el)) as UserEntity[];
    }

    return {
      userId: domain.properties.userId,
      firstname: domain.properties.firstname,
      lastname: domain.properties.lastname,
      email: domain.properties.email,
      password: domain.properties.password,
      roles: [],
      refreshToken: domain.properties.refreshToken,
      createdAt: domain.properties.createdAt,
      updatedAt: domain.properties.updatedAt,
      deletedAt: domain.properties.deletedAt,
    };
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((el) => UserDto.fromDataToDomain(el)) as User[];
    }

    const props: UserProps = {
      userId: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      roles: data.roles.map((role) => new Role(role.roleId, role.name)),
      refreshToken: data.refreshToken,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      deletedAt: data.deletedAt,
    };

    return new User(props);
  }
}
