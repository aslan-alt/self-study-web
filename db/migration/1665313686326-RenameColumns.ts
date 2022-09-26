import {MigrationInterface, QueryRunner} from 'typeorm';

export class RenameColumns1665313686326 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'password_digest', 'passwordDigest');
    await queryRunner.renameColumn('comments', 'user_id', 'userId');
    await queryRunner.renameColumn('comments', 'post_id', 'postId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('users', 'passwordDigest', 'password_digest');
    await queryRunner.renameColumn('comments', 'userId', 'user_id');
    await queryRunner.renameColumn('comments', 'postId', 'post_id');
  }
}
