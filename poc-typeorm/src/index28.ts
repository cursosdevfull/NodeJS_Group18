import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";

AppDataSource.initialize()
  .then(async () => {
    try {
      const medicRepository = AppDataSource.getRepository(MedicEntity);
      const manager = medicRepository.manager;

      await manager
        .createQueryBuilder()
        .update(MedicEntity)
        .set({ email: "carolina.gonzales@email.com" })
        .where("medicId = :medicId", { medicId: 6 })
        .execute();

      console.log("Data saved successfully");
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
