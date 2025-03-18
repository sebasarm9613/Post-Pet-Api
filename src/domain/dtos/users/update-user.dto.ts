import { regularExp } from '../../../config';

export class UpdateUserDTO {
	constructor(
		public name: string,
		public email: string,
		public password: string,
	) {}

	static create(object: { [key: string]: any }): [string?, UpdateUserDTO?] {
		const { name, email, password } = object;

		if (!name) return ['Name is required'];
		if (!email) return ['Email is required'];
		if (!regularExp.email.test(email)) return ['Invalid email'];
		if (!password) return ['Missing password'];
		if (!regularExp.password.test(password))
			return [
				'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character',
			];

		return [undefined, new UpdateUserDTO(name, email, password)];
	}
}
