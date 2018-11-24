import {MigrationInterface, QueryRunner} from "typeorm";

export class AddParentIdsDefault1543061206617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "parentIds" SET DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "parentIds" DROP DEFAULT`);
    }

}
