type TGender = "MALE" | "FEMALE";

interface IUser {
  firstname: string;
  lastname: string;
  age: number;
  gender: TGender;
  isActive: boolean;
}

interface IMedic {
  firstname: string;
  lastname: string;
  age: number;
  specialty: string;
  active: boolean;
}

const user: IUser = {
  firstname: "Carla",
  lastname: "Zorrilla",
  age: 34,
  gender: "FEMALE",
  isActive: true,
};

const medic: IMedic = {
  firstname: "Lucas",
  lastname: "Luque",
  age: 56,
  specialty: "Pediatría",
  active: true,
};

function updateEntity<Entity, Properties extends keyof Entity>(
  entity: Entity,
  propertyName: Properties,
  value: Entity[Properties]
) {
  entity[propertyName] = value;
}

updateEntity(medic, "age", 33);
console.log(medic);

/*function UpdateUser(props: Partial<IUser>) {
    Object.assign(user, props)
}

function UpdateMedic(props: Partial<IMedic>) {
    Object.assign(medic, props)
}

UpdateUser({firstname: "Claudia"})
console.log(user)

UpdateMedic({age: 45})
console.log(medic)*/
