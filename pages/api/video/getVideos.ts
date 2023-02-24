import {NextApiHandler} from 'next';
import {Video} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';

const getVideos: NextApiHandler = async (req, res) => {
  const connection = await getConnection();
  try {
    const videos = await connection.getRepository(Video).find({where: {course: {id: req.body.id}}});
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({error, message: 'Failed to get data'});
  }
};

export default getVideos;
