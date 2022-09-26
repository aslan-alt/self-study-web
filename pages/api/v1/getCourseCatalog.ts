import {NextApiHandler} from 'next';

export type Courses = {title: string; id: number}[];

const getCourseCatalog: NextApiHandler = async (req, res) => {
  res.status(200).json({
    courses: [
      {title: '互联网', id: 1},
      {title: '代码仓库', id: 2},
      {title: 'HTML', id: 3},
      {title: 'CSS', id: 4},
      {title: 'JavaScript', id: 5},
      {title: '框架', id: 6},
    ],
  });
};

export default getCourseCatalog;
