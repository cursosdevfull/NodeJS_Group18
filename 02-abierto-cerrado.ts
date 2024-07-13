class Animal {
  private type: string;

  constructor(type: string) {
    this.type = type;
  }

  getType() {
    return this.type;
  }
}

class Mamifero extends Animal {
  private subType: string;

  constructor(subType: string) {
    super("Mamifero");
    this.subType = subType;
  }

  getNewType() {
    return `El mamifero es del subtipo: ${this.subType}`;
  }
}

class Reptil extends Animal {
  private region: string;

  constructor(region: string) {
    super("Reptil");
    this.region = region;
  }
}

const animal = new Animal("Mamifero");
console.log(animal.getType());

const mamifero = new Mamifero("Terrestre");
console.log(mamifero.getNewType());

const reptil = new Reptil("Asia");
console.log(reptil.getType());
