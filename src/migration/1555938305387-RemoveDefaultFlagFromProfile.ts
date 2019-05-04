import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveDefaultFlagFromProfile1555938305387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_fbfbfcbaa392301fcb0048306c"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "default"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "default" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_fbfbfcbaa392301fcb0048306c" ON "profile" ("default", "userId") `);
    }

}
