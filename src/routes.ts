import {Router} from 'express';
import {UserController} from './controllers/user/UserController';
import {CategoryController} from './controllers/category/CategoryController';
import {isAuthenticated} from './middlewares/isAuthenticated';

const router = Router();


// -- USERS ROUTES
router.post('/create-user', new UserController().create);
router.post('/auth-user', new UserController().auth);
router.post('/update-password', isAuthenticated, new UserController().updatePassword);
router.get('/me', isAuthenticated, new UserController().me);

// -- CATEGORY ROUTES
router.post('/create-category', isAuthenticated, new CategoryController().create);
router.post('/read-category', isAuthenticated, new CategoryController().read);
router.post('/update-category', isAuthenticated, new CategoryController().update);
router.post('/delete-category', isAuthenticated, new CategoryController().delete);


export {router};