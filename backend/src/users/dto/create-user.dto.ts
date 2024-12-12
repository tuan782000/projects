import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' }) // nếu không {message: ""} thì tự lấy có sẵn
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string; // email - duy nhất

    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    phone: string;
    address: string;
    image: string;
}
