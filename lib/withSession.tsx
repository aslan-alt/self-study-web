import {withIronSessionApiRoute, withIronSessionSsr} from 'iron-session/next';
import {GetServerSideProps, NextApiHandler} from 'next';

export const ironOptions = {
  cookieName: 'my-tree',
  password: '6f85853e-6922-432e-8022-9be8bceb521d',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions);
}

export function withSessionSsr(handler: GetServerSideProps) {
  return withIronSessionSsr(handler, ironOptions);
}
