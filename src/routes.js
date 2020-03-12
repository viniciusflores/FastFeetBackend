import { Router } from 'express';
import multer from 'multer';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', SessionController.login);

routes.use(authMiddleware);

routes.post('/createRecipient', RecipientController.store);
routes.put('/updateRecipient', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliveryman', DeliverymanController.store);

module.exports = routes;
