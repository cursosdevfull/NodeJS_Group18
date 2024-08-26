import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

      const medic = new MedicEntity();
      medic.firstname = "Jana";
      medic.lastname = "Doe";
      medic.cmp = "78980";

      const specialty = new SpecialtyEntity();
      specialty.name = "Cardiología";
      specialty.description = "Cardiología generiátrica";
      specialty.medic = medic;

      await specialtyRepository.save(specialty);

      const specialty2 = new SpecialtyEntity();
      specialty2.name = "Cardiología Americana";
      specialty2.description = "Cardiología pediátrica";
      specialty2.medic = medic;

      await specialtyRepository.save(specialty2);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
