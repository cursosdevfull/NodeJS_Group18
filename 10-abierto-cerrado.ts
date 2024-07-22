class Transportation {
  type: string;
  capacity: number;
  engine: string;

  constructor(type: string, capacity: number, engine: string) {
    this.type = type;
    this.capacity = capacity;
    this.engine = engine;
  }

  isSafe(): boolean {
    if (this.capacity > 10 && this.engine === "diesel") return false;

    return true;
  }
}

class Bus extends Transportation {
  isBusSafe() {
    return this.isSafe();
  }
}

class Bike extends Transportation {
  override isSafe() {
    if (this.capacity > 2) return false;
    return true;
  }
}

const bus = new Bus("coaster", 12, "gas");
console.log("safe bus", bus.isBusSafe());

const bike = new Bike("bicicleta", 3, "tracción manual");
console.log("safe bike ", bike.isSafe());
