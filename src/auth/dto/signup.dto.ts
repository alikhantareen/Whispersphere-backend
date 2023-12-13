import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEmpty,
} from '@nestjs/class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Please enter a valid email',
    },
  )
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message: 'Password should be more than 6 characters.',
  })
  password: string;

  @IsEmpty()
  @IsString()
  following: [string];

  @IsEmpty()
  @IsString()
  followers: [string];
}
