import { IsNull, Not } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);

      const medics = await medicRepository.find({
        where: { email: Not(IsNull()) },
        select: { medicId: true, firstname: true, email: true },
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
