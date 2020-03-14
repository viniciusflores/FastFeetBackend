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

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.post('/createRecipient', RecipientController.store);
routes.put('/updateRecipient', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/deliveryman/:deliverymanId', DeliverymanController.show);
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliverymanId', DeliverymanController.update);
routes.delete('/deliveryman/:deliverymanId', DeliverymanController.destroy);

module.exports = routes;
