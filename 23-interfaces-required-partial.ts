interface UserPropsRequired {
  name: string;
  lastname: string;
  email: string;
}

interface UserPropsOptionals {
  age?: number;
  gender: string;
}

class User {
  private readonly userId: number;
  private name: string;
  private lastname: string;
  private age: number;
  private email: string;
  private gender: string;
  private createdAt: Date;
  private updatedAt: Date | undefined;
  private deletedAt: Date | undefined;

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
  gender: "Male",
};

const user = new User(props);
console.log(user);
