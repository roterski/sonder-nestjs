import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedAtAndUpdatedAtColumnsToAllEntities1546996776359 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "version" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "post" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "version" integer NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "version" integer NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    }

}
