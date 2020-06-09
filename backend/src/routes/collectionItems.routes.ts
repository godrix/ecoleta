import { Router } from 'express';
import CollectionItemsController from '../controllers/CollectionItemsController';

const collectionItemsRouter = Router();
const collectionItems = new CollectionItemsController();

collectionItemsRouter.get('/', collectionItems.index);

export default collectionItemsRouter;
