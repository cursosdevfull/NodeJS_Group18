interface UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;
}

interface IUser {
  update(): void;
  delete(): void;
  reconstitute(): void;
}

class User implements UserProperties, IUser {
  userId: string = "";
  firstname: string = "";
  lastname: string = "";
  age: number = 0;
  gender: string = "";
  email: string = "";
  tall: number = 0;

  constructor(obj: UserProperties) {
    Object.assign(this, obj); // {userId: "", firstname: "", ...} // {userId: "12968852-3b40-47e9-a80e-e3bbea4346b4", firstname: "Juan"}
    /*this.userId = obj.userId
        this.firstname = obj.firstname
        this.lastname = obj.lastname
        this.age = obj.age
        this.gender = obj.gender
        this.email = obj.email
        this.tall = obj.tall*/
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  reconstitute(): void {
    throw new Error("Method not implemented.");
  }
}

const properties: UserProperties = {
  userId: "12968852-3b40-47e9-a80e-e3bbea4346b4",
  firstname: "Juan",
  lastname: "Zapata",
  age: 34,
  gender: "MALE",
  email: "juan@email.com",
  tall: 182,
};

const user = new User(properties);
console.log(user);
