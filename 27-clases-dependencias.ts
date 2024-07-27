class Database {
  constructor(host: string, user: string, pass: string, port: number) {}

  orm() {
    return {
      //add(userId: number, firstname: string, lastname: string, age: number) { console.log("user added") },
      put(user: User) {
        //console.log(user)
      },
      update(user: User) {
        console.log("user updated");
      },
      find(firstname: string, lastname: string) {
        return Math.random() > 0.5 ? true : false;
      },
    };
  }
}

interface Repository {
  add(user: User): void;
  update(user: User): void;
  search(user: User): boolean;
}

class Data implements Repository {
  private database = new Database("localhost", "user01", "dios", 3306);

  add(user: User) {
    this.database.orm().put(user);
    console.log("user added", user);
  }

  update(user: User) {
    this.database.orm().update(user);
    console.log("user updated", user);
  }

  search(user: User) {
    const { firstname, lastname } = user.properties;
    return this.searchUser(firstname, lastname);
  }

  searchUser(firstname: string, lastname: string) {
    return this.database.orm().find(firstname, lastname);
  }
}

class Business {
  private repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  //insert(userId: number, firstname: string, lastname: string, age: number) {
  insert(user: User) {
    const userFound = this.repository.search(user);

    if (userFound) throw new Error("User exists in database");

    this.repository.add(user);
    //const database = new Database("localhost", "user01", "dios", 3306)
    //const db = this.database.orm()
    //db.add(userId, firstname.toUpperCase(), lastname.toUpperCase(), age)
    //db.put(user)
  }
}

interface UserProperties {
  firstname: string;
  lastname: string;
  age: number;
}

class User {
  private readonly userId: number;
  private firstname: string;
  private lastname: string;
  private age: number;

  //constructor(firstname: string, lastname: string, age: number) {
  constructor(props: UserProperties) {
    if (props.age < 5) throw new Error("Age must be longer than 5");
    if (props.firstname.length < 3)
      throw new Error("Firsname cannot shorter 3 characters");
    if (props.lastname.length < 3)
      throw new Error("Lastname cannot shorter than 3 characters");

    Object.assign(this, props);
    /*this.firstname = firstname
        this.lastname = lastname
        this.age = age*/
    this.userId = new Date().getTime();
  }

  get properties() {
    return {
      userId: this.userId,
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
    };
  }
}

const props: UserProperties = {
  firstname: "Josefina",
  lastname: "Caballero",
  age: 25,
};
//const user = new User("Josefina", "Caballero", 23)
const user = new User(props);
//const database = new Database("localhost", "user01", "dios", 3306)
const repository: Repository = new Data();
const business = new Business(repository);
//const business = new Business(database)
//const {userId, firstname, lastname, age} = user.properties
//business.insert(userId, firstname, lastname, age)
business.insert(user);
