import { Router } from 'express';
import uploadConfig from './config/upload';
import multer from 'multer';
import authMiddleware from './middlewares/AuthMiddleware';

import OrphanagesController from './controllers/OrphanagesControlller';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';


const routes = Router();

const upload = multer(uploadConfig)


routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
routes.post('/orphanages',authMiddleware, upload.array('images') ,OrphanagesController.create);


routes.post('/register', UsersController.create);
routes.post('/auth', AuthController.authenticate);

export default routes;