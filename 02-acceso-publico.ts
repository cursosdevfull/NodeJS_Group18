class Animal {
  public raza: string = "";
  public color: string = "";

  public getDescription() {
    return `Raza: ${this.raza}. Color: ${this.color}`;
  }
}

const contexto = {
  raza: "Husky",
  color: "Marrón",
};

const animal = new Animal();
animal.raza = "Samoyedo";
animal.color = "Blanco";

console.log("raza", animal.raza);
console.log("color", animal.color);

console.log("description", animal.getDescription());

const method = animal.getDescription.bind(contexto);

console.log("method result", method());
