import {NextApiHandler} from 'next';
import {Course} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';

const getAllCourses: NextApiHandler = async (req, res) => {
  const connection = await getConnection();
  try {
    const courses = await connection.getRepository(Course).find();
    res.status(200).json({courses});
  } catch (error) {
    res.status(500).json({error, message: 'Failed to get data'});
  }
};

export default getAllCourses;
