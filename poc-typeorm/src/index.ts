import { AppDataSource } from "./data-source";
import { MedicEntity } from "./entity/Medic";
import { SpecialtyEntity } from "./entity/Specialty";
import { UnitOfWork } from "./unit-of-work";

AppDataSource.initialize()
  .then(async () => {
    const uow: UnitOfWork = new UnitOfWork(AppDataSource.manager);
    await uow.start();

    const work = async () => {
      const manager = uow.getManager();
      const medicRepository = manager.getRepository(MedicEntity);
      const specialtyRepository = manager.getRepository(SpecialtyEntity);

      const medic = new MedicEntity();
      medic.firstname = "Jane";
      medic.lastname = "Doe";
      medic.cmp = "654321";
      medic.email = "jane.doe@email.com";
      medic.age = 30;

      const specialty = new SpecialtyEntity();
      specialty.name = "Pediatrics";
      specialty.description =
        "Pediatrics is the branch of medicine that involves the medical care of infants, children, and adolescents.";

      await specialtyRepository.save(specialty);
      await medicRepository.save(medic);
    };

    await uow.complete(work);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
