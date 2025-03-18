import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from '../services/user.service';

export class UserRoutes {
	static get routes(): Router {
		const router = Router();

		const userService = new UserService();
		const controller = new UserController(userService);

		router.post('/register', controller.createUser);
		router.post('/login', controller.loginUser);
		router.get('/', controller.findAllUsers);
		router.get('/:id', controller.findOneUser);
		router.patch('/:id', controller.updateUser);
		router.delete('/:id', controller.deleteUser);

		return router;
	}
}
