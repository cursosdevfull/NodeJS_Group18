class User {
  private readonly userId: number = 45654987;
  name: string;
  lastname: string;
  age: number;
  private password: string;

  constructor() {
    this.userId = 45677;
    this.name = "Carlos";
    this.lastname = "Zapata";
    this.age = 30;
    this.password = "X0r9P(GX;R4f";
  }

  getUserId() {
    return this.userId;
  }
}

const user = new User();
console.log("name", user.name);
console.log("lastname", user.lastname);
//console.log("userId", user.userId)
console.log("userId", user.getUserId());
//user.userId = 69854
//console.log("userId", user.userId)
//console.log("password", user.password)
