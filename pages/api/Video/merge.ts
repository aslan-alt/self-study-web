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
  courseId: number;
};

const mergeSlices: NextApiHandler = async (req, res) => {
  const {fileName, courseId} = req.body as MergeSlicesRequest;

  const connection = await getConnection();
  const course = await connection.manager.findOne(Course, {where: {id: courseId}});

  const video = new Video();

  video.title = fileName;
  video.course = course;
  video.author = req.session.user;
  video.path = path.join(videoUploadDir, fileName);
  await connection.getRepository(Video).save(video);

  const needMergeFilePath = path.join(videoUploadDir, fileName);
  const chunks = await fse.readdir(needMergeFilePath);
  try {
    chunks
      .sort((a, b) => {
        const [aIndex] = a.split('.');
        const [bIndex] = b.split('.');
        return Number(aIndex) - Number(bIndex);
      })
      .map((chunkPath) => {
        fs.appendFileSync(
          needMergeFilePath + '.mp4',
          fs.readFileSync(path.join(needMergeFilePath, chunkPath))
        );
      });
    fse.removeSync(needMergeFilePath);
    res.status(200).json({status: 'success'});
  } catch (error) {
    res.status(500).json({status: 'failed', error});
  }
};

export default withSessionRoute(mergeSlices);
