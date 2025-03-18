import { Router } from 'express';
import { UserRoutes } from './user/route';
import { PetPostRoutes } from './petPost/route';

export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.use('/api/users', UserRoutes.routes);
		router.use('/api/petposts', PetPostRoutes.routes);

		return router;
	}
}
