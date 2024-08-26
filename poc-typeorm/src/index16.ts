import { In } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);

      const medics = await medicRepository.find({
        where: { age: In([23, 33, 21]) },
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
