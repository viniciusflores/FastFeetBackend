import { Router } from 'express';
import multer from 'multer';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import NotificationController from './app/controllers/NotificationController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import WithdrawalController from './app/controllers/WithdrawalController';

import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipient', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);

routes.get('/deliveryman/:deliverymanId', DeliverymanController.show);
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliverymanId', DeliverymanController.update);
routes.delete('/deliveryman/:deliverymanId', DeliverymanController.destroy);

routes.post('/finishDelivery/:deliveryId', FinishDeliveryController.store);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/withdrawal/:deliveryId', WithdrawalController.store);

module.exports = routes;
