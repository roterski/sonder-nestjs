import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProfilesTable1551733020288 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "name" character varying NOT NULL, "default" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fbfbfcbaa392301fcb0048306c" ON "profile"("userId", "default") `);
    await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
    await queryRunner.query(`DROP INDEX "IDX_fbfbfcbaa392301fcb0048306c"`);
    await queryRunner.query(`DROP TABLE "profile"`);
  }
}
