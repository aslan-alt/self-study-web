import {NextApiHandler} from 'next';
import {Course} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';
import {withSessionRoute} from '@/lib/withSession';
import {CreateCoursesRequest} from '../../../requests';

const creatCourse: NextApiHandler = async (req, res) => {
  const {title, type} = req.body as CreateCoursesRequest;
  const connection = await getConnection();

  const course = new Course();
  course.author = req.session.user;
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

export default withSessionRoute(creatCourse);
