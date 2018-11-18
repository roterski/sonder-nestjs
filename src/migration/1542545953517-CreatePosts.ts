import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreatePosts1542545953517 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
        {
          name: 'title',
          type: 'varchar'
        },
        {
          name: 'body',
          type: 'varchar'
        }
      ]
    }), true, true, true);

    await queryRunner.createIndex('posts', new TableIndex({
      name: 'IDX_POSTS_TITLE',
      columnNames: ['title']
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('posts');
    await queryRunner.dropIndex('posts', 'IDX_POSTS_TITLE');
  }

}
