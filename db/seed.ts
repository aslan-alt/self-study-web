/* eslint-disable no-console */
import 'reflect-metadata';
import {User} from '@/DB/entity';
import AppDataSource from './ormconfig';

AppDataSource.initialize()
  .then(async () => {
    const {manager} = AppDataSource;
    const user = new User();
    user.username = 'jingsong';
    user.password = 'password';
    user.passwordConfirmation = 'passwordConfirmation';

    await manager.save(user);
    const posts = await AppDataSource.manager.find(User);

    console.log('Inserting a new user into the database...');

    console.log('Loaded users: ', posts);
  })
  .catch((error) => console.log(error));
