import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);

      const page = 1;
      const limit = 3;

      const [medics, total] = await medicRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
      });

      console.log("medics", medics);
      console.log("total", total);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
