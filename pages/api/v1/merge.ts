import fs from 'fs';
import path from 'path';
import fse from 'fs-extra';
import {NextApiHandler} from 'next';
import {videoUploadDir} from '@/constants/index';

const Merge: NextApiHandler = async (req, res) => {
  const needMergeFilePath = path.join(videoUploadDir, req.body.chunkDir);
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

export default Merge;
