import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repo = await AppDataSource.getRepository(SpecialtyEntity);

      const medic1 = new MedicEntity();
      medic1.firstname = "John";
      medic1.lastname = "Doe";
      medic1.cmp = "123456";
      medic1.age = 30;
      medic1.email = "john.doe@email.com";

      const medic2 = new MedicEntity();
      medic2.firstname = "Jane";
      medic2.lastname = "Doe";
      medic2.cmp = "654321";
      medic2.age = 25;
      medic2.email = "jane.doe@email.com";

      const specialty1 = new SpecialtyEntity();
      specialty1.name = "Cardiology";
      specialty1.description = "Cardiology description";
      specialty1.medics = [medic1, medic2];

      const specialty2 = new SpecialtyEntity();
      specialty2.name = "Dermatology";
      specialty2.description = "Dermatology description";
      specialty2.medics = [medic1];

      await Promise.all([repo.save(specialty1), repo.save(specialty2)]);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
