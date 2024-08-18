import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

      const specialty = new SpecialtyEntity();
      specialty.name = "Cardiology";
      specialty.description = "Cardiology description";

      await specialtyRepository.save(specialty);

      const medic = new MedicEntity();
      medic.firstname = "John";
      medic.lastname = "Doe";
      medic.cmp = "123456";
      medic.specialty = specialty;

      await medicRepository.save(medic);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
