import { Router } from 'express';
import collectionItems from './collectionItems.routes';
import collectionPoints from './collectionPoints.routes';
import sessions from './session.routes';

const routes = Router();

routes.use('/items', collectionItems);

routes.use('/points', collectionPoints);

routes.use('/sessions', sessions);

export default routes;
