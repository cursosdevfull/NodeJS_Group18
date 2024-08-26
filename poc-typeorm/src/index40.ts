import { Brackets } from "typeorm";

import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const manager = medicRepository.manager;

      const medics = await manager
        .createQueryBuilder(MedicEntity, "medic")
        .select(["medic.firstname", "medic.lastname", "medic.age"])
        .where("medic.age > :age", { age: 30 })
        .andWhere(
          new Brackets((query) => {
            query
              .where("medic.firstname = :firstname", { firstname: "Luis" })
              .orWhere("medic.lastname = :lastname", { lastname: "Arévalo" });
          })
        )
        .getRawMany();

      console.log(medics);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
