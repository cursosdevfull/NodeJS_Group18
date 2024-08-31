import { EntityManager, QueryRunner } from "typeorm";

export type TUnitOfWork = {
  start(): void;
  complete(work: () => Promise<void>): Promise<void>;
  getManager(): EntityManager;
};

export class UnitOfWork implements TUnitOfWork {
  private transactionManager: EntityManager;
  private queryRunner: QueryRunner;

  constructor(private manager: EntityManager) {
    this.queryRunner = manager.connection.createQueryRunner();
  }

  start(): void {
    this.queryRunner.startTransaction();
    this.transactionManager = this.queryRunner.manager;
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
      console.log("Transaction committed");
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      console.log("Transaction rolled back");
    } finally {
      await this.queryRunner.release();
      console.log("Query runner released");
    }
  }

  getManager(): EntityManager {
    if (
      !this.transactionManager ||
      !(this.transactionManager instanceof EntityManager)
    ) {
      throw new Error("Transaction manager is not initialized");
    }

    return this.transactionManager;
  }
}
