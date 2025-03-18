import { Router } from 'express';
import { PetPostController } from './controller';
import { PetPostService } from '../services/PetPost.service';

export class PetPostRoutes {
	static get routes(): Router {
		const router = Router();

		const petPostService = new PetPostService();
		const petPostController = new PetPostController(petPostService);

		router.get('/', petPostController.findAllPetPost);
		router.get('/:id', petPostController.findOnePetPost);
		router.post('/', petPostController.createPetPost);
		router.patch('/:id', petPostController.updatePetPost);
		router.patch('/:id/approve', petPostController.updateApprovePetPost);
		router.patch('/:id/reject', petPostController.updateRejectPetPost);
		router.delete('/:id', petPostController.deletePetPost);

		return router;
	}
}
