import path from 'path';
import formidable from 'formidable';
import fse from 'fs-extra';
import {NextApiHandler} from 'next';
import {videoUploadDir} from '@/constants/index';

export const config = {
  api: {
    bodyParser: false,
  },
};

const Upload: NextApiHandler = async (req, res) => {
  return new Promise((resolve, reject) => {
    if (!fse.existsSync(videoUploadDir)) {
      fse.mkdirSync(videoUploadDir);
    }
    const form = new formidable.IncomingForm({
      uploadDir: videoUploadDir,
      keepExtensions: true,
      maxFileSize: 1000 * 1024 * 1024,
    });

    form.parse(req, (error) => {
      if (error) {
        res.status(400).json({status: 'Fail', message: 'upload failed', error});
      }
      reject();
    });

    form.on('file', (name, chunk) => {
      const chunkDir = `${videoUploadDir}/${chunk.originalFilename?.split('-')[0] ?? ''}`;
      if (!fse.existsSync(chunkDir)) {
        fse.mkdirSync(chunkDir);
      }
      fse.move(chunk.filepath, path.join(chunkDir, chunk.originalFilename?.split('-')[1] ?? ''));
      res.status(200).json({chunkDir});
      resolve('Uploaded successfully');
    });
  });
};

export default Upload;
