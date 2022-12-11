import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import {NextApiHandler} from 'next';
import {Course, Video} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';
import {videoUploadDir} from '@/constants/index';
import {withSessionRoute} from '@/lib/withSession';

export type MergeSlicesRequest = {
  fileName: string;
  courseId?: number;
};

const mergeSlices: NextApiHandler = async (req, res) => {
  const {fileName, courseId} = req.body as MergeSlicesRequest;

  const connection = await getConnection();
  if (courseId) {
    const course = await connection.manager.findOne(Course, {where: {id: courseId}});

    if (course) {
      const video = new Video();

      video.title = fileName;
      video.course = course;
      video.author = req.session.user;
      video.path = path.join(videoUploadDir, `${fileName}_${new Date().getTime()}`);
      await connection.getRepository(Video).save(video);

      const videoChunksDir = path.join(videoUploadDir, fileName);

      const chunks = await fse.readdir(videoChunksDir);
      try {
        chunks
          .sort((a, b) => {
            return Number(a.split('.')[0]) - Number(b.split('.')[0]);
          })
          .map((chunkPath) => {
            fs.appendFileSync(
              `${video.path}.mp4`,
              fs.readFileSync(path.join(videoChunksDir, chunkPath))
            );
          });
        fse.removeSync(videoChunksDir);
        res.status(200).json({status: 'success'});
      } catch (error) {
        res.status(500).json({status: 'An error occurred during the merge process', error});
      }
    } else {
      res.status(404).json({status: 'courseId not found'});
    }
  } else {
    res.status(400).json({status: 'courseId is Required'});
  }
};

export default withSessionRoute(mergeSlices);
