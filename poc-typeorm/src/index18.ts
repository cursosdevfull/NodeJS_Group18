import { MoreThanOrEqual } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const manager = AppDataSource.manager;

      const medicRepository = manager.getRepository(MedicEntity);

      const medics = await medicRepository.find({
        where: { age: MoreThanOrEqual(33) },
        select: { medicId: true, firstname: true, age: true },
      });

      console.log("medics", medics);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
