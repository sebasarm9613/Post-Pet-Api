import { Request, Response } from 'express';
import { CreatePetPostDTO, CustomError } from '../../domain';
import { PetPostService } from '../services/PetPost.service';
import { UpdatePetPostDTO } from '../../domain/dtos/petPost/update-petPost.dto';

export class PetPostController {
  constructor(private readonly petPostService: PetPostService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: 'Something went very wrong! 🧨' });
  };

  findOnePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.petPostService
      .findOne(id)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };

  findAllPetPost = (req: Request, res: Response) => {
    this.petPostService
      .findAll()
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };

  createPetPost = (req: Request, res: Response) => {
    const [error, createPetPostDTO] = CreatePetPostDTO.create(req.body);
    const userId = req.body.sessionUser.id;

    if (error) return res.status(422).json({ message: error });

    this.petPostService
      .create(createPetPostDTO!, userId)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };

  updatePetPost = (req: Request, res: Response) => {
    const { id } = req.params;
    const [error, updatePetPostDTO] = UpdatePetPostDTO.create(req.body);

    if (error) return res.status(422).json({ message: error });

    this.petPostService
      .update(id, updatePetPostDTO!)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };

  updateApprovePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.petPostService
      .updateApprove(id)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };
  updateRejectPetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.petPostService
      .updateReject(id)
      .then((data) => res.status(200).json(data))
      .catch((error: any) => this.handleError(error, res));
  };

  deletePetPost = (req: Request, res: Response) => {
    const { id } = req.params;

    this.petPostService
      .delete(id)
      .then(() => res.status(204).json(null))
      .catch((error: any) => this.handleError(error, res));
  };
}
