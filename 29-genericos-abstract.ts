class BaseInfrastructure<Entity, TypeId> {
  insert(entity: Entity): Promise<Entity> {
    return Promise.resolve(entity);
  }

  update(id: TypeId, entity: Entity): Promise<Entity> {
    return Promise.resolve(entity);
  }
}

class MedicInfrastructure extends BaseInfrastructure<Medic, string> {
  report() {
    return Promise.resolve({ total: 1000, activos: 900 });
  }
}

class Medic {
  constructor(
    public readonly medicId: string,
    public firstname: string,
    public lastname: string
  ) {}
}

class Driver {
  constructor(
    public readonly driverId: number,
    public firstname: string,
    public lastname: string
  ) {}
}

async function process() {
  const medic = new Medic("abc123", "Carolina", "Zevallos");
  //const infra = new BaseInfrastructure<Medic, string>()
  const infra = new MedicInfrastructure();
  await infra.insert(medic);
  console.log(await infra.update("abc123", medic));
  console.log(await infra.report());

  const driver = new Driver(1, "Luis", "Cárdenas");
  const infraDriver = new BaseInfrastructure<Driver, number>();
  await infraDriver.insert(driver);
  console.log(await infraDriver.update(1, driver));
}

process();
