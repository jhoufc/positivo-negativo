import {Router} from 'express';
import {UserController} from './controllers/user/UserController';
import {isAuthenticated} from './middlewares/isAuthenticated';

const router = Router();


// -- USERS ROUTES
router.post('/create-user', new UserController().create)
router.post('/auth-user', new UserController().auth)
router.post('/update-password', isAuthenticated, new UserController().updatePassword)
router.get('/me', isAuthenticated, new UserController().me)


export {router};