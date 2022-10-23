import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateCourse1665326063611 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'courses',
        columns: [
          {
            name: 'id',
            isGenerated: true,
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {name: 'type', type: 'int'},
          {name: 'title', type: 'varchar'},
          {name: 'authorId', type: 'int'},
          {name: 'createdAt', type: 'timestamp', isNullable: false, default: 'now()'},
          {name: 'updatedAt', type: 'timestamp', isNullable: false, default: 'now()'},
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('courses');
  }
}
