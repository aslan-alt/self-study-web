import fs from 'fs';
import path from 'path';
import {NextApiHandler} from 'next';
import {videoUploadDir} from '@/constants/index';

const getVideo: NextApiHandler = async (req, res) => {
  const needMergeFilePath = path.join(videoUploadDir, 'test.mp4');
  const range = req.headers['range'];

  if (range) {
    const stats = await fs.promises.stat(needMergeFilePath);
    const [, rangeStart, rangeEnd] = range.match(/=(\d+)-(\d+)?/) ?? [];

    const start = parseInt(rangeStart, 10);
    let end = rangeEnd ? parseInt(rangeEnd, 10) : start + 1024 * 1024;
    if (end > stats.size - 1) {
      end = stats.size - 1;
    }
    res.writeHead(206, {
      'Content-Type': 'video/mp4',
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Length': end - start + 1,
      'Accept-Ranges': 'bytes',
    });
    fs.createReadStream(needMergeFilePath, {start, end}).pipe(res);
  } else {
    fs.createReadStream(needMergeFilePath).pipe(res);
  }
};

export default getVideo;
