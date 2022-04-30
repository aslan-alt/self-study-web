import {withIronSessionApiRoute} from 'iron-session/next';
import {cloneDeep} from 'lodash';
import {NextApiHandler} from 'next';
import {UAParser} from 'ua-parser-js';
import {getDatabaseConnection} from '../../lib/getDatabaseConnection';
import {ironOptions} from '../../lib/withSession';
import {Comment} from '../../src/entity/Comment';

const GetAllComments: NextApiHandler = async (req, res) => {
  const ua = req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  const connection = await getDatabaseConnection();

  const found = (await connection.manager.find(Comment)).sort(function (a, b) {
    return a.createdAt < b.createdAt ? 1 : -1;
  });

  await res.status(200).send({
    comments: cloneDeep(found),
    result: cloneDeep(result),
  });
};
export default withIronSessionApiRoute(GetAllComments, ironOptions);
