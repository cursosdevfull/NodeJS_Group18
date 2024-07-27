interface UserProps {
  name: string;
  lastname: string;
  age: number;
  email: string;
  gender: string;
}

interface UserPropsUpdate {
  name?: string;
  lastname?: string;
  age?: number;
  gender?: string;
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

  constructor(props: UserProps) {
    this.userId = new Date().getTime();
    this.name = props.name;
    this.lastname = props.lastname;
    this.age = props.age;
    this.email = props.email;
    this.gender = props.gender;

    this.createdAt = new Date();
  }

  update(props: UserPropsUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }
}

const props: UserProps = {
  name: "Carlos",
  lastname: "Espinoza",
  age: 30,
  email: "carlos@email.com",
  gender: "Male",
};

const user = new User(props);
console.log(user);

const propsUpdate: UserPropsUpdate = {
  age: 40,
};

user.update(propsUpdate);
console.log(user);
