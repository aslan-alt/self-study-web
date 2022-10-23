import path from 'path';
import formidable from 'formidable';
import fse from 'fs-extra';
import {NextApiHandler} from 'next';
import {Image} from '@/DB/entity';
import {getConnection} from '@/DB/getConnection';
import {imageUploadDir} from '@/constants/index';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImage: NextApiHandler = async (req, res) => {
  const connection = await getConnection();

  if (!fse.existsSync(imageUploadDir)) {
    fse.mkdirSync(imageUploadDir);
  }
  const form = new formidable.IncomingForm({
    uploadDir: imageUploadDir,
    keepExtensions: true,
    maxFileSize: 1000 * 1024 * 1024,
  });

  form.parse(req, (error) => {
    if (error) {
      res.status(400).json({status: 'Fail', message: 'upload image failed', error});
    }
  });

  form.on('file', async (name, chunk) => {
    const image = new Image();
    const imagePath = path.join(imageUploadDir, chunk.originalFilename);
    image.path = imagePath;
    image.name = chunk.originalFilename;
    const courseRepository = await connection.getRepository(Image);
    await courseRepository.save(image);

    fse.renameSync(chunk.filepath, imagePath);
    res.status(200).json({image});
  });
};

export default uploadImage;
