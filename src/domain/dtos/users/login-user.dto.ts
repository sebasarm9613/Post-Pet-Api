import { regularExp } from '../../../config';

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ['email is required'];
    if (!regularExp.email.test(email)) return ['Invalid Email'];
    if (!password) return ['Missing password'];
    if (!regularExp.password.test(password))
      return [
        'The password must be at least 10 characters long and contain at least one uppercase letter, one lowercase letter, and one special character ',
      ];

    return [
      undefined,
      new LoginUserDto(email.trim().toLowerCase(), password.trim()),
    ];
  }
}
