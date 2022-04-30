import {withIronSessionApiRoute} from 'iron-session/next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';
import {ironOptions} from '../../../lib/withSession';

export default withIronSessionApiRoute(async (req, res) => {
  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = (req.session as any).user;
    if (!user) {
      res.status(401).json({message: '未登陆'});
      return;
    }
    post.author = user;
    const connect = await getDatabaseConnection();
    await connect.manager.save(post);
    res.status(200).json(post);
  }
}, ironOptions);
