/* eslint-disable @typescript-eslint/camelcase */
import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
import CollectionPointsController from '../controllers/CollectionPointsController';

import ensureAuth from '../middlewares/ensureAuth';

const collectionPointRouter = Router();
const upload = multer(multerConfig);

const collectionPoints = new CollectionPointsController();

collectionPointRouter.use(ensureAuth);

collectionPointRouter.get('/', collectionPoints.index);

collectionPointRouter.get('/:id', collectionPoints.show);

collectionPointRouter.post(
  '/',
  upload.single('image'),
  collectionPoints.create,
);

export default collectionPointRouter;
