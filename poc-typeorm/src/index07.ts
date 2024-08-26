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
      });

      const medic = new MedicEntity();
      medic.firstname = "Carla";
      medic.lastname = "Zevallos";
      medic.cmp = "565665";
      medic.specialty = specialty;

      const medic2 = new MedicEntity();
      medic2.firstname = "Jorge";
      medic2.lastname = "Salas";
      medic2.cmp = "45555";
      medic2.specialty = specialty;

      await Promise.all([
        medicRepository.save(medic),
        medicRepository.save(medic2),
      ]);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
