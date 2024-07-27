class User {
  readonly userId = "76c78056-25b6-4bb0-b991-c8b01651e39a";
  protected readonly password = "<}7x6WzDc82Ve?ZqZODs";
}

class Developer extends User {
  getPasswordLength() {
    return this.password.length;
  }

  getUserId() {
    return this.userId;
  }
}

class DeveloperCloud extends Developer {
  getPassword() {
    return this.password;
  }
}

const user = new User();
const developer = new Developer();
const developerCloud = new DeveloperCloud();

console.log("length", developer.getPasswordLength());
console.log("password", developerCloud.getPassword());
