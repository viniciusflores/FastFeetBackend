import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/login', SessionController.login);

routes.use(authMiddleware);

routes.post('/createRecipient', RecipientController.store);
routes.put('/updateRecipient', RecipientController.update);

module.exports = routes;
