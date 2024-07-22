class UserSalary {
  private userId!: number;
  private salary!: number;

  initial(userId: number, salary: number) {
    this.userId = userId;
    this.salary = salary;
  }

  get valueSalary() {
    return this.salary;
  }

  set valueSalary(salary: number) {
    this.salary = salary;
  }
}

const userId = new Date().getTime();
const userSalary = new UserSalary();
userSalary.initial(userId, 1000);
userSalary.valueSalary = 2000;
console.log(userSalary.valueSalary);
