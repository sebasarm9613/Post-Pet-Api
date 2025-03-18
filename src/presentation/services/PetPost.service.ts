import { CreatePetPostDTO } from '../../domain';

export class PetPostService {
	async findAllPetPost() {}
	async findOnePetPost(id: string) {}
	async createPetPost(data: CreatePetPostDTO) {}
	async updatePetPost(id: string) {}
	async updateApprovePetPost(id: string) {}
	async updateRejectPetPost(id: string) {}
	async deletePetPost(id: string) {}
}
