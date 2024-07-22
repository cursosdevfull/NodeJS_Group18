class OldRobot {
  makeAmericanCoffee() {
    return "make american coffee";
  }

  getBill() {
    return "you bill, here you are";
  }
}

class ModernRobot extends OldRobot {
  makeFrapucchino() {
    return "make frapucchino";
  }

  override getBill() {
    return "here you are. The bill includes tips and taxes";
  }
}

const oldRobot = new OldRobot();
console.log(oldRobot.makeAmericanCoffee());
console.log(oldRobot.getBill());

const modernRobot = new ModernRobot();
console.log(modernRobot.makeAmericanCoffee());
console.log(modernRobot.getBill());
console.log(modernRobot.makeFrapucchino());
