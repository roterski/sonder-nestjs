import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultToVersion1556965780909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tag" ALTER COLUMN "version" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "version" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "post_tag" ALTER COLUMN "version" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "version" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "version" SET DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "version" SET DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }
}
