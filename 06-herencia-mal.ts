class UserInformationPersonal {
  private readonly userId: number;
  private name: string;
  private lastname: string;
  private gender: string;
  private age: number;

  constructor(name: string, lastname: string, gender: string, age: number) {
    this.name = name;
    this.lastname = lastname;
    this.gender = gender;
    this.age = age;
    this.userId = new Date().getTime();
  }

  properties() {
    return {
      userId: this.userId,
      name: this.name,
      lastname: this.lastname,
      gender: this.gender,
      age: this.age,
    };
  }
}

class UserSalary extends UserInformationPersonal {
  private readonly salary: number;

  constructor(
    salary: number,
    name: string,
    lastname: string,
    gender: string,
    age: number
  ) {
    super(name, lastname, gender, age);
    this.salary = salary;
  }

  getProperties() {
    const props = super.properties();
    return { ...props, salary: this.salary };
  }
}

const userSalary = new UserSalary(1000, "Luis", "Padilla", "Male", 30);
console.log(userSalary.getProperties());
