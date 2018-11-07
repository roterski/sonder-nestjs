import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsers1541621531713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true
                },
                {
                    name: 'email',
                    type: 'varchar'
                },
                {
                    name: 'firstName',
                    type: 'varchar'
                },
                {
                    name: 'facebookId',
                    type: 'varchar'
                },
                {
                    name: 'token',
                    type: 'varchar'
                }
            ]
        }), true);

        await queryRunner.createIndex('users', new TableIndex({
            name: 'IDX_USERS_EMAIL',
            columnNames: ['email']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('users');
        await queryRunner.dropIndex('users', 'IDX_USERS_EMAIL');
    }

}
