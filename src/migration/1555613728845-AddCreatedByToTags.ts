import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCreatedByToTags1555613728845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tag" ADD "createdBy" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tag" DROP COLUMN "createdBy"`);
    }

}
