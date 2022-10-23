import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateVideo1665505630018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'videos',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {name: 'title', type: 'varchar'},
          {name: 'path', type: 'varchar'},
          {name: 'imagePath', type: 'varchar'},
          {name: 'playCount', type: 'int'},
          {name: 'authorId', type: 'int'},
          {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          {name: 'updatedAt', type: 'timestamp', isNullable: false, default: 'now()'},
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('videos');
  }
}
