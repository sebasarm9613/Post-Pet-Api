import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { PetPostService } from '../services/PetPost.service';

export class PetPostController {
	constructor(private readonly petPostService: PetPostService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({ message: error.message });
		}

		console.log(error);
		return res.status(500).json({ message: 'Something went very wrong! 🧨' });
	};

	findOnePetPost = (req: Request, res: Response) => {};
	findAllPetPost = (req: Request, res: Response) => {};
	createPetPost = (req: Request, res: Response) => {};
	updatePetPost = (req: Request, res: Response) => {};
	updateApprovePetPost = (req: Request, res: Response) => {};
	updateRejectPetPost = (req: Request, res: Response) => {};
	deletePetPost = (req: Request, res: Response) => {};
}
