import { Audit } from "../../../../core/domain/roots/audit";
import { Role } from "../entities/role";

export type UserRequiredProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  refreshToken: string;
  roles: Role[];
};

export type UserOptionalProps = {
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type UserProps = UserRequiredProps & Partial<UserOptionalProps>;

export type UserUpdateProps = Partial<Omit<UserRequiredProps, "email">>;

export class User extends Audit {
  private readonly userId: number;
  private firstname: string;
  private lastname: string;
  private email: string;
  private password: string;
  private refreshToken: string;
  private roles: Role[];

  constructor(props: UserProps) {
    super({
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      deletedAt: props.deletedAt,
    });
    Object.assign(this, props);
  }

  get properties() {
    return {
      userId: this.userId,
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      refreshToken: this.refreshToken,
      roles: this.roles,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: Partial<UserProps>) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
