import {withIronSessionApiRoute} from 'iron-session/next';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Comment} from 'src/entity/Comment';
import {ironOptions} from '../../lib/withSession';

interface CommentData {
  commentContent: string;
  useId: number | string;
}
export default withIronSessionApiRoute(async (req, res) => {
  const {commentContent} = req.body as CommentData;
  const user = (req.session as any).user;
  (req.session as any).user = (req.session as any).user || null;
  const comment = new Comment();
  if (!user) {
    await res.status(401).send({message: '未登陆'});
    return;
  }

  const connect = await getDatabaseConnection();
  const now = new Date();
  comment.content = commentContent;
  comment.userId = user.id;
  comment.postId = 0;
  comment.user = user;
  comment.createdAt = now;
  comment.updateAt = now;
  comment.nickname = user.username;
  await req.session.save();
  await connect.manager.save(comment);
  await res.status(200).send(comment);
}, ironOptions);
