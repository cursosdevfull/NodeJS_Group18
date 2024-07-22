class User {
  name: string;
  lastname: string;
  age: number;
  private password: string;

  constructor() {
    this.name = "Carlos";
    this.lastname = "Zapata";
    this.age = 30;
    this.password = "X0r9P(GX;R4f";
  }
}

const user = new User();
console.log("name", user.name);
console.log("lastname", user.lastname);
//console.log("password", user.password)
