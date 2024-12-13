import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPassword } from '@/utils/hashPassword';
import aqp from 'api-query-params'; // hỗ trợ query
import mongoose from 'mongoose';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private readonly mailerService: MailerService
    ) {}

    isEmailExit = async (email: string) => {
        const user = await this.userModel.exists({ email });
        if (user) {
            return true;
        }
        return false;
    };

    async create(createUserDto: CreateUserDto) {
        const { name, email, password, phone, address, image } = createUserDto;
        // console.log(createUserDto);

        // check user email
        const isExist = await this.isEmailExit(email);

        // nếu isExist là true là email này tồn tại ném exception
        if (isExist) {
            throw new BadRequestException(
                `Email is existing: ${email}. Please choose another email`
            );
        }

        // hashed password
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            phone,
            address,
            image
        });
        return {
            _id: user._id
        };
    }

    // phân trang
    // users?current=1&pageSize=5 - current hiển thị trang hiện tại - pageSize là số phần tử xuất hiện trên 1 trang
    async findAll(query: string, current: number, pageSize: number) {
        const { filter, sort } = aqp(query);

        if (filter.current) delete filter.current; // bỏ - current và pageSize mặc định của aqp
        if (filter.pageSize) delete filter.pageSize;

        if (!current) current = 1;
        if (!pageSize) pageSize = 10;

        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (current - 1) * pageSize;

        const results = await this.userModel
            .find(filter)
            .limit(pageSize)
            .skip(skip)
            .select('-password') // bỏ trường password
            .sort(sort as any);

        return { results, totalPages };
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    // Hàm này viết riêng - sau đưa qua module export ra - thằng auth sẽ dùng này
    async findByEmail(email: string) {
        return await this.userModel.findOne({ email }); // trả ra người dùng nếu như email đấy hợp lệ
    }

    async update(updateUserDto: UpdateUserDto) {
        return await this.userModel.updateOne(
            { _id: updateUserDto._id },
            {
                // ...updateUserDto // như này sẽ nhanh nhưng nhược điểm người dùng truyền thừa thì sẽ bị vấn đề cập nhật các trường thừa
                name: updateUserDto.name,
                phone: updateUserDto.phone,
                address: updateUserDto.address,
                image: updateUserDto.image
            }
        );
    }
    // update(id: number, updateUserDto: UpdateUserDto) {
    //     return `This action updates a #${id} user`;
    // }

    async remove(_id: string) {
        // dùng thư viện mongoose check id gửi lên
        // có thê viết dto hoặc dùng mongoose để check
        // mình dùng mongoose check
        // return true nếu là objectId return null với các thứ còn lại
        if (mongoose.isValidObjectId(_id)) {
            // delete
            return await this.userModel.deleteOne({ _id });
        } else {
            throw new BadRequestException('Invalid _id');
        }
    }

    async handleRegister(registerDto: CreateAuthDto) {
        const { name, email, password } = registerDto;
        // console.log(createUserDto);

        // check user email
        const isExist = await this.isEmailExit(email);

        // nếu isExist là true là email này tồn tại ném exception
        if (isExist) {
            throw new BadRequestException(
                `Email is existing: ${email}. Please choose another email`
            );
        }

        // hashed password
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
        const codeId = uuidv4();

        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            isActive: false,
            codeId: codeId,
            codeExpired: dayjs().add(5, 'minutes')
        });

        // send email
        this.mailerService.sendMail({
            to: user.email,
            // from: '',
            subject: 'Activate your account at @tuannguyendev',
            // html: '<b>Hello world</b>'
            template: 'register',
            context: {
                name: user.name || user.email,
                activationCode: codeId
            }
        });
        // trả phản hồi
        // return {
        //     _id: user._id
        // };
    }
}
