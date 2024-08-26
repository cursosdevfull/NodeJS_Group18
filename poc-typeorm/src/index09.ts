import { AppDataSource } from "./data-source";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

      const specialty = await specialtyRepository.findOne({
        where: { specialtyId: 1 },
        relations: ["medics"],
      });

      console.log("specialty", specialty);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
