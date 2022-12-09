import * as dotenv from 'dotenv';
import {DataSource} from 'typeorm';

dotenv.config();

const source = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'blog',
  password: '',
  database: 'test',
  synchronize: false,
  logging: false,
  entities: ['dist/entity/**/*.js'],
  migrations: ['dist/migration/**/*.js'],
});

export default source;
