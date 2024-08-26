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

      const medic2 = new MedicEntity();
      medic2.firstname = "John";
      medic2.lastname = "Doe";
      medic2.cmp = "12345";

      const specialty = new SpecialtyEntity();
      specialty.name = "Cardiología";
      specialty.description = "Cardiología generiátrica";
      specialty.medics = [medic, medic2];

      await specialtyRepository.save(specialty);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
