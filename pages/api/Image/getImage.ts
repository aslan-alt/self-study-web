import fs from 'fs';
import {NextApiHandler} from 'next';

const getImage: NextApiHandler = async (req, res) => {
  if (req.query.path) {
    res.writeHead(206, {
      'Content-Type': 'image/png',
      'Accept-Ranges': 'bytes',
    });
    try {
      fs.createReadStream(req.query.path?.toString()).pipe(res);
    } catch (error) {
      res.status(503).json({error});
    }
  } else {
    res.status(400).json({error: 'Path is undefined'});
  }
};

export default getImage;
