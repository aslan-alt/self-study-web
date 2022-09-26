import 'reflect-metadata';
import {DataSource} from 'typeorm';
import * as entities from './entity';

let db: DataSource;

export const getConnection = async () => {
  if (db) {
    return db;
  }

  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'blog',
    password: '',
    database: 'test',
    entities: [...Object.values(entities)],
    synchronize: false,
    logging: false,
    extra: {
      max: 10,
    },
  });

  db = await dataSource.initialize();
  return dataSource;
};
