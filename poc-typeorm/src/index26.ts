import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const manager = medicRepository.manager;

      const medics = await manager
        .createQueryBuilder(MedicEntity, "Medic")
        .innerJoin("Medic.specialty", "Specialty")
        .select([
          "Medic.firstname",
          "Medic.lastname",
          "Medic.cmp",
          "Specialty.name",
          "Specialty.description",
        ])
        .getMany();

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
