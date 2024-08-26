import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const manager = medicRepository.manager;

      const specialty = await manager.findOne(SpecialtyEntity, {
        where: { specialtyId: 1 },
      });

      await manager
        .createQueryBuilder()
        .delete()
        .from(MedicEntity)
        .where("medicId = :medicId", { medicId: 11 })
        .execute();
      //.getSql();

      //console.log(sql);

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
