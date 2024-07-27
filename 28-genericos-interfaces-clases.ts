// Domain
interface Repository<Entity> {
  add(entity: Entity): void;
  update(entity: Entity): void;
  search(filter: Filter): boolean;
  reportBySpecialty(specialty: string): string[];
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

  constructor(props: UserProperties) {
    if (props.age < 5) throw new Error("Age must be longer than 5");
    if (props.firstname.length < 3)
      throw new Error("Firsname cannot shorter 3 characters");
    if (props.lastname.length < 3)
      throw new Error("Lastname cannot shorter than 3 characters");

    Object.assign(this, props);
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

interface MedicProperties {
  firstname: string;
  lastname: string;
  specialty: string;
  subSpecialty: string;
}

class Medic {
  private readonly medicId: number;
  private firstname: string;
  private lastname: string;
  private specialty: string;
  private subSpecialty: string;

  constructor(props: MedicProperties) {
    if (props.firstname.length < 3)
      throw new Error("Firsname cannot shorter 3 characters");
    if (props.lastname.length < 3)
      throw new Error("Lastname cannot shorter than 3 characters");

    Object.assign(this, props);
    this.medicId = new Date().getTime();
  }

  get properties() {
    return {
      medicId: this.medicId,
      firstname: this.firstname,
      lastname: this.lastname,
      specialty: this.specialty,
      subSpecialty: this.subSpecialty,
    };
  }
}

// Business
abstract class BaseBusiness<Entity> {
  protected repository: Repository<Entity>;

  constructor(repository: any) {
    this.repository = repository;
  }

  update(entity: Entity) {
    this.repository.update(entity);
  }
}

class BusinessUser extends BaseBusiness<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  insert(user: User) {
    const { firstname, lastname } = user.properties;
    const filter: Filter = { firstname, lastname };
    const userFound = this.repository.search(filter);

    if (userFound) throw new Error("User exists in database");

    this.repository.add(user);
  }

  report() {
    return this.repository.reportBySpecialty("cualquier cosa");
  }
}

class BusinessMedic extends BaseBusiness<Medic> {
  constructor(repository: Repository<Medic>) {
    super(repository);
  }

  insert(medic: Medic) {
    const { firstname, lastname } = medic.properties;
    const filter: Filter = { firstname, lastname };
    const medicFound = this.repository.search(filter);

    if (medicFound) throw new Error("Medic exists in database");

    this.repository.add(medic);
  }

  generateReportBySpecialty(specialty: string) {
    return this.repository.reportBySpecialty(specialty);
  }
}

// Infrastructure
interface Filter {
  [prop: string]: string | number | boolean | object | any[];
}

class Database<Entity> {
  constructor(host: string, user: string, pass: string, port: number) {}

  orm() {
    return {
      put(entity: Entity) {},
      update(entity: Entity) {
        console.log("entity updated");
      },
      find(filter: Filter) {
        return Math.random() > 0.5 ? true : false;
      },
    };
  }
}

class BaseData<Entity> implements Repository<Entity> {
  private database = new Database<Entity>("localhost", "user01", "dios", 3306);

  add(entity: Entity) {
    this.database.orm().put(entity);
    console.log("entity added", entity);
  }

  update(entity: Entity) {
    this.database.orm().update(entity);
    console.log("entity updated", entity);
  }

  search(filter: Filter) {
    return this.database.orm().find(filter);
  }

  reportBySpecialty(specialty: string) {
    return ["medic01", "medic02", "medic03"];
  }
}

const props: UserProperties = {
  firstname: "Josefina",
  lastname: "Caballero",
  age: 25,
};
const user = new User(props);
const repository: Repository<User> = new BaseData<User>();
const business = new BusinessUser(repository);
business.insert(user);

const propsMedic: MedicProperties = {
  firstname: "Carolina",
  lastname: "Acevedo",
  specialty: "Cardiología",
  subSpecialty: "Cardiología geriátrica",
};
const medic = new Medic(propsMedic);
const repositoryMedic: Repository<Medic> = new BaseData<Medic>();
const businessMedic = new BusinessMedic(repositoryMedic);
businessMedic.insert(medic);
console.log(businessMedic.generateReportBySpecialty("cardiología"));
