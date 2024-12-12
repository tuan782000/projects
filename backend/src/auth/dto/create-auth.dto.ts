import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty({ message: 'email is required' })
    email: string;
    @IsNotEmpty({ message: 'password is required' })
    password: string;
    @IsOptional()
    name: string;
}
