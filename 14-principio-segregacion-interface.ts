interface IComputer {
  processor: string;
  memory: string;
  brand: string;

  getProcessor(): string;
  getMemory(): string;
  getBrand(): string;
}

//interface IPortable extends IComputer {
interface IPortable {
  /*processor: string
    memory: string
    brand: string*/
  screenSize: string;

  /*getProcessor(): string
    getMemory(): string
    getBrand(): string*/
  getScreenSize(): string;
}

class Laptop implements IPortable, IComputer {
  processor: string;
  memory: string;
  brand: string;
  screenSize: string;

  constructor(
    processor: string,
    memory: string,
    brand: string,
    screenSize: string
  ) {
    this.processor = processor;
    this.memory = memory;
    this.brand = brand;
    this.screenSize = screenSize;
  }

  getProcessor(): string {
    return this.processor;
  }
  getMemory(): string {
    return this.memory;
  }
  getBrand(): string {
    return this.brand;
  }
  getScreenSize(): string {
    return this.screenSize;
  }
}

class Desktop implements IComputer {
  processor: string;
  memory: string;
  brand: string;

  constructor(processor: string, memory: string, brand: string) {
    this.processor = processor;
    this.memory = memory;
    this.brand = brand;
  }

  getProcessor(): string {
    return this.processor;
  }
  getMemory(): string {
    return this.memory;
  }
  getBrand(): string {
    return this.brand;
  }
}
