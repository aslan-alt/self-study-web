import {User} from '@/DB/entity';
declare module 'iron-session' {
  interface IronSessionData {
    user?: User;
  }
}
