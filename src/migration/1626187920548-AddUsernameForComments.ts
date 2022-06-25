import {MigrationInterface, QueryRunner, TableColumn} from 'typeorm';

export class AddUsernameForComments1626187920548 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('comments', [
      new TableColumn({name: 'nickname', type: 'varchar'}),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('comments', 'nickname');
  }
}
