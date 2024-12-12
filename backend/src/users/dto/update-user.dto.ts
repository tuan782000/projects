import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    //_id: của mongodb - lý do ở đây mình gửi kèm chung luôn phần body - thay vì phải thêm chung params
    @IsMongoId({ message: 'Invalid _id format' })
    @IsNotEmpty({ message: '_id is required' })
    _id: string;

    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    address: string;

    @IsOptional()
    image: string;
}
