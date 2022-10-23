import {NextApiHandler} from 'next';
import {Course, User} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';
import {CreateCoursesRequest} from '../../../requests';

const creatCourse: NextApiHandler = async (req, res) => {
  const {title, type, author} = req.body as CreateCoursesRequest;
  const connection = await getConnection();
  const user = await connection.manager.findOne(User, {where: {id: author}});

  const course = new Course();
  course.author = user;
  course.type = type;
  course.title = title;
  // const videos = new Video();
  //
  // videos.path = 'test/testtadas';
  // videos.title = 'testZZ';
  // videos.playCount = 1;
  // videos.author = user;
  // videos.course = course;

  const courseRepository = await connection.getRepository(Course);
  await courseRepository.save(course);
  res.status(200).json(course);
};

export default creatCourse;
