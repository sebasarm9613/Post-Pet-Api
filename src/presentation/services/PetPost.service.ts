import { PetPost, PostStatus } from '../../data/postgres/models/PetPost.model';
import { CreatePetPostDTO, CustomError } from '../../domain';
import { UpdatePetPostDTO } from '../../domain/dtos/petPost/update-petPost.dto';
import { UserService } from './user.service';

export class PetPostService {
  constructor(private readonly finderUserService: UserService) {}
  async findAll() {
    try {
      return await PetPost.find({
        where: {
          // status: PostStatus.PENDING,
        },
        relations: {
          user: true,
        },
        select: {
          user: {
            id: true,
            name: true,
            email: true,
          },
        },
      });
    } catch (error) {
      throw CustomError.internalServer('Error fetching pet posts');
    }
  }

  async findOne(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        // status: PostStatus.PENDING,
        id,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }
    return petPost;
  }

  async create(data: CreatePetPostDTO, userId: string) {
    const petPost = new PetPost();
    const user = await this.finderUserService.findOne(userId);

    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.image_url = data.image_url;
    petPost.user = user;

    try {
      return await petPost.save();
    } catch (error) {
      throw CustomError.internalServer('Error creating pet post');
    }
  }

  async update(id: string, data: UpdatePetPostDTO) {
    const petPost = await this.findOne(id);

    petPost.pet_name = data.pet_name;
    petPost.description = data.description;
    petPost.image_url = data.image_url;

    try {
      await petPost.save();
      return {
        message: 'Pet post updated successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error updating pet post');
    }
  }

  async updateApprove(id: string) {
    const petPost = await this.findOnePetPostPendingApprove(id);

    petPost.status = PostStatus.APPROVED;

    try {
      await petPost.save();
      return {
        message: 'Pet post approved successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error approving pet post');
    }
  }

  private async findOnePetPostPendingApprove(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id: id,
        status: PostStatus.PENDING,
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }

    return petPost;
  }

  async updateReject(id: string) {
    const petPost = await this.findOnePetPostPendingReject(id);

    petPost.status = PostStatus.REJECTED;

    try {
      await petPost.save();
      return {
        message: 'Pet post rejected successfully',
      };
    } catch (error) {
      throw CustomError.internalServer('Error rejecting pet post');
    }
  }

  private async findOnePetPostPendingReject(id: string) {
    const petPost = await PetPost.findOne({
      where: {
        id: id,
        status: PostStatus.PENDING,
      },
    });

    if (!petPost) {
      throw CustomError.notFound('Pet post not found');
    }

    return petPost;
  }

  async delete(id: string) {
    const petPost = await this.findOne(id);

    try {
      await petPost.remove();
      return {
        message: ' Pet post deleted successfully',
      };
    } catch (error) {
      throw CustomError.internalServer(' Error deleting pet post');
    }
  }
}
