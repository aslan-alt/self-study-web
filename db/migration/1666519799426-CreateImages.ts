import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateImages1666519799426 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'images',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {name: 'name', type: 'varchar'},
          {name: 'path', type: 'varchar'},
          {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          {name: 'updatedAt', type: 'timestamp', isNullable: false, default: 'now()'},
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
