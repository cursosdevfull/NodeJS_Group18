import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);
      const medicRepository = AppDataSource.getRepository(MedicEntity);

      const specialty = await specialtyRepository.findOne({
        where: { specialtyId: 1 },
        relations: ["medics"],
      });

      const medic = new MedicEntity();
      medic.firstname = "Luis";
      medic.lastname = "Zapata";
      medic.cmp = "444455";

      const medic2 = new MedicEntity();
      medic2.firstname = "Luisa";
      medic2.lastname = "Zamalloa";
      medic2.cmp = "344444";

      specialty.medics = [...specialty.medics, medic, medic2];

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
