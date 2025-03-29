import { Router } from 'express';
import { UserController } from './controller';
import { UserService } from '../services/user.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data/postgres/models/user.model';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const controller = new UserController(userService);

    router.post('/register', controller.createUser);
    router.post('/login', controller.loginUser);
    router.use(AuthMiddleware.protect);
    router.get(
      '/',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.findAllUsers
    );
    router.get('/:id', controller.findOneUser);
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.updateUser
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      controller.deleteUser
    );

    return router;
  }
}
