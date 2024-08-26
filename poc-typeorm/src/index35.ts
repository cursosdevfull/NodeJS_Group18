import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const manager = medicRepository.manager;

      const page = 2;
      const pageSize = 3;

      const medics = await manager
        .createQueryBuilder()
        .from(MedicEntity, "medic")
        .select(["medic.firstname", "medic.lastname", "medic.cmp", "medic.age"])
        .offset((page - 1) * pageSize)
        .limit(pageSize)
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
