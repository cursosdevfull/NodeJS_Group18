let username: string = "a.zavala";
username = "c.cavero";
username = "p.zanabria";
//username = 30
//username = true

const users = ["user01", "user02", "user03"];
users.push("user04");
//users = ["name01", "name02"]

let listName: Array<string> = ["Joe", "Karen", "Luis"];
let listUser: string[] = ["Carlos", "Azucena"];

let listStudents: Array<{
  name: string;
  age: number;
  addresses: Array<string>;
}> = [
  {
    name: "Alfredo",
    age: 23,
    addresses: ["dirección casa", "dirección departamento"],
  },
];
listStudents.push({
  name: "Jorge",
  age: 45,
  addresses: ["Calle1. Urbanización Saturnalia"],
});

const dataToProcess: Array<Array<string>> = [
  ["processA1", "processA2", "processA3"],
  ["processB1", "processB2"],
];

const dataUserToExport: Array<Array<{ name: string; age: number }>> = [
  [
    { name: "Carla", age: 20 },
    { name: "Joaquín", age: 23 },
  ],
  [{ name: "Luis", age: 34 }],
];
