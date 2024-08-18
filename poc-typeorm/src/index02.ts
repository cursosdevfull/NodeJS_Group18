import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity();
    medic.firstname = "John";
    medic.lastname = "Doe";
    medic.cmp = "123456";

    const specialty = new SpecialtyEntity();
    specialty.name = "Cardiology";
    specialty.description = "Cardiology description";

    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

      const list = [
        medicRepository.save(medic),
        specialtyRepository.save(specialty),
      ];
      await Promise.all(list);
      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
