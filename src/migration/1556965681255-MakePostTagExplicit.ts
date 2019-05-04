import {MigrationInterface, QueryRunner} from "typeorm";

export class MakePostTagExplicit1556965681255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "post_tag" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "postId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_73552cc67eff36e230f9b4930fa" PRIMARY KEY ("id", "postId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_444c1b4f6cd7b632277f557935" ON "post_tag" ("postId") `);
        await queryRunner.query(`CREATE INDEX "IDX_346168a19727fca1b1835790a1" ON "post_tag" ("tagId") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7e4fae2ea901c7c38a0e431d2b" ON "post_tag" ("postId", "tagId") `);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_73552cc67eff36e230f9b4930fa"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId")`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_73552cc67eff36e230f9b4930fa" PRIMARY KEY ("postId", "tagId", "id")`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_73552cc67eff36e230f9b4930fa"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId")`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "FK_444c1b4f6cd7b632277f5579354" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "FK_346168a19727fca1b1835790a14" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "FK_346168a19727fca1b1835790a14"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "FK_444c1b4f6cd7b632277f5579354"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_73552cc67eff36e230f9b4930fa" PRIMARY KEY ("postId", "tagId", "id")`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_73552cc67eff36e230f9b4930fa"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3" PRIMARY KEY ("postId", "tagId")`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "version" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_tag" DROP CONSTRAINT "PK_7e4fae2ea901c7c38a0e431d2b3"`);
        await queryRunner.query(`ALTER TABLE "post_tag" ADD CONSTRAINT "PK_73552cc67eff36e230f9b4930fa" PRIMARY KEY ("id", "postId", "tagId")`);
        await queryRunner.query(`DROP INDEX "IDX_7e4fae2ea901c7c38a0e431d2b"`);
        await queryRunner.query(`DROP INDEX "IDX_346168a19727fca1b1835790a1"`);
        await queryRunner.query(`DROP INDEX "IDX_444c1b4f6cd7b632277f557935"`);
        await queryRunner.query(`DROP TABLE "post_tag"`);
    }

}
