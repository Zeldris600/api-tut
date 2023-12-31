import {
    IsEmail, IsString,
    IsNotEmpty,
    MinLength,
    Matches,
} from 'class-validator';

 class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    // fullName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    // @IsString()
    // @IsNotEmpty()
    // @Matches(/^\+[1-9]\d{1,14}$/)
    // phoneNumber: string;
}

export default RegisterDto;
