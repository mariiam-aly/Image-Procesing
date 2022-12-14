import express from 'express';
import * as fs from 'fs';
import reSize from '../fuctions/imgProcessing';
const routes = express.Router();
/*this end-point acts depending on the validity of the parameters 
and the existence of the same required image of same  dimentions */
/*displayes either: error, new resized image, an already existing resized image */
routes.get('/images', (req, res) => {
  const imagePath = `/Users/mariamaly/projects/ImageProcessing/assets/full/${req.query.fileName}.jpeg`;

  if (!fs.existsSync(imagePath)) {
    res.send('File name does not exist');
  } else if (
    !((req.query.width as unknown as number) >= 0) ||
    !((req.query.height as unknown as number) >= 0)
  ) {
    res.send('please enter valid dimentions');
  } else {
    const newImageName = `${req.query.fileName}${req.query.width}x${req.query.height}`;
    const newImagePath = `/Users/mariamaly/projects/ImageProcessing/assets/thumb/${newImageName}.jpeg`;

    if (fs.existsSync(newImagePath)) {
      res.sendFile(newImagePath);
    } else {
      setTimeout(function () {
        res.sendFile(newImagePath);
      }, 1000);
      reSize(
        `./assets/full/${req.query.fileName}.jpeg`,
        `./assets/thumb/${newImageName}.jpeg`
      );
    }
  }
});

export default routes;
