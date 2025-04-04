export class CreatePetPostDTO {
  constructor(
    public pet_name: string,
    public description: string,
    public image_url: string
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

    return [
      undefined,
      new CreatePetPostDTO(
        pet_name.trim().toLowerCase(),
        description.trim(),
        image_url.trim()
      ),
    ];
  }
}
