type GENDER = "MALE" | "FEMALE";
type DATE_OPTIONAL = Date | undefined;

interface UserPropsRequired {
  name: string;
  lastname: string;
  email: string;
}

interface UserPropsOptionals {
  age?: number;
  gender: GENDER;
}

class User {
  private readonly userId: number;
  private name: string;
  private lastname: string;
  private age: number;
  private email: string;
  private gender: string;
  private createdAt: Date;
  private updatedAt: DATE_OPTIONAL;
  private deletedAt: DATE_OPTIONAL;

  constructor(
    props: Required<UserPropsRequired> & Partial<UserPropsOptionals>
  ) {
    Object.assign(this, props);
    this.userId = new Date().getTime();
    this.createdAt = new Date();
  }
}

const props: Required<UserPropsRequired> & Partial<UserPropsOptionals> = {
  name: "Carlos",
  lastname: "Espinoza",
  age: 30,
  email: "carlos@email.com",
  gender: "MALE",
};

const user = new User(props);
console.log(user);
