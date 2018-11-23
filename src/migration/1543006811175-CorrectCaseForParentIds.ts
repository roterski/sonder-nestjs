import {MigrationInterface, QueryRunner} from "typeorm";

export class CorrectCaseForParentIds1543006811175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "parent_ids" TO "parentIds"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "parentIds" TO "parent_ids"`);
    }

}
