import { Router } from 'express';
import { PetPostController } from './controller';
import { PetPostService } from '../services/PetPost.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserRole } from '../../data/postgres/models/user.model';
import { UserService } from '../services/user.service';

export class PetPostRoutes {
  static get routes(): Router {
    const router = Router();

    const finderUserService = new UserService();
    const petPostService = new PetPostService(finderUserService);
    const petPostController = new PetPostController(petPostService);

    router.use(AuthMiddleware.protect);
    router.get('/', petPostController.findAllPetPost);
    router.get('/:id', petPostController.findOnePetPost);
    router.post(
      '/',
      AuthMiddleware.restrictTo(UserRole.USER),
      petPostController.createPetPost
    );
    router.patch(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      petPostController.updatePetPost
    );
    router.patch(
      '/:id/approve',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      petPostController.updateApprovePetPost
    );
    router.patch(
      '/:id/reject',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      petPostController.updateRejectPetPost
    );
    router.delete(
      '/:id',
      AuthMiddleware.restrictTo(UserRole.ADMIN),
      petPostController.deletePetPost
    );

    return router;
  }
}
