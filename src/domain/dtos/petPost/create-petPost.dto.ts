export class CreatePetPostDTO {
	constructor(
		public pet_name: string,
		public description: string,
		public image_url: string,
		public user_id: string,
	) {}

	static create(object: { [key: string]: any }): [string?, CreatePetPostDTO?] {
		const { pet_name, description, image_url, user_id } = object;

		if (!pet_name) return ['Pet name is required'];
		if (!description) return ['Description is required'];
		if (!image_url) return ['Image URL is required'];
		if (!user_id) return ['User ID is required'];

		return [
			undefined,
			new CreatePetPostDTO(
				pet_name.trim(),
				description.trim(),
				image_url.trim(),
				user_id.trim(),
			),
		];
	}
}
