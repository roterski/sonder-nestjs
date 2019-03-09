import {MigrationInterface, QueryRunner} from "typeorm";

export class AddProfileIdToPostAndComment1552130159331 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post" ADD "profileId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "profileId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_970844fcd10c2b6df7c1b49eacf" FOREIGN KEY ("profileId") REFERENCES "profile"("id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_f0ce9ae5087b18b8c7000843a43" FOREIGN KEY ("profileId") REFERENCES "profile"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_f0ce9ae5087b18b8c7000843a43"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_970844fcd10c2b6df7c1b49eacf"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "profileId"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "profileId"`);
    }

}
