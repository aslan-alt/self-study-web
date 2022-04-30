import 'reflect-metadata';
import {getConnection, createConnection, Connection} from 'typeorm';
import {Comment} from 'src/entity/Comment';
import {Post} from 'src/entity/Post';
import {User} from 'src/entity/User';
import config from '../ormconfig.json';

// const host = process.env.DATABASE_HOST || '';
// const port = Number(process.env.DATABASE_PORT) || 3306;
// const username = process.env.DATABASE_USERNAME || '';
// const password = process.env.DATABASE_PASSWORD || '';
// const database = process.env.DATABASE_NAME || '';

let connectionReadyPromise: Promise<Connection> | null = null;

export const getDatabaseConnection = () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }
      //@ts-ignore
      return await createConnection({
        ...config,
        host: process.env.NODE_ENV === 'production' ? 'localhost' : 'localhost',
        database: process.env.NODE_ENV === 'production' ? 'production_blog' : 'test_1',
        entities: [Post, User, Comment],
      });
    })();
  }

  return connectionReadyPromise;
};
