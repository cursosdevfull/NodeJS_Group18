import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    const user = new UserEntity();
    user.firstname = "Juan";
    user.lastname = "Darío";
    user.email = "juan.dario@email.com";

    try {
      const repository = AppDataSource.getRepository(UserEntity);
      await repository.save(user);
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
