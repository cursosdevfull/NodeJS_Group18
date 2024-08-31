import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const repoSpecialty = AppDataSource.getRepository(SpecialtyEntity);
      const repoMedic = AppDataSource.getRepository(MedicEntity);

      const specialties = await repoSpecialty.find({ relations: ["medics"] });
      console.log(specialties);

      const medics = await repoMedic.find({
        relations: ["specialties"],
        select: {
          firstname: true,
          lastname: true,
          specialties: { name: true },
        },
      });
      console.log(JSON.stringify(medics, null, "\t"));

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
