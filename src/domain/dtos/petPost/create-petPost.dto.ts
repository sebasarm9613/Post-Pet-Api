export class CreatePetPostDTO {
  constructor(
    public pet_name: string,
    public description: string,
    public image_url: string,
    public user_id: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreatePetPostDTO?] {
    const { pet_name, description, image_url, user_id } = object;

    if (!pet_name) return ['Pet name is required'];
    if (!description) return ['Description is required'];
    // if (!image_url) return ['Image URL is required'];
    if (
      !image_url ||
      typeof image_url !== 'string' ||
      !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(image_url.trim())
    )
      return ['Image URL is required and must be a valid URL'];
    if (!user_id) return ['User ID is required'];
    // if (
    // 	!user_id ||
    // 	typeof user_id !== 'string' ||
    // 	!/^[0-9a-fA-F]{24}$/.test(user_id.trim())
    // )
    // 	return [
    // 		'User ID is required and must be a valid 24-character hex string',
    // 	];

    return [
      undefined,
      new CreatePetPostDTO(
        pet_name.trim().toLowerCase(),
        description.trim(),
        image_url.trim(),
        user_id.trim()
      ),
    ];
  }
}
