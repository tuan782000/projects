import { UsersService } from '@/users/users.service';
import { comparePassword } from '@/utils/comparePassword';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        const isValidPassword = await comparePassword(pass, user.password);

        // nếu không có user và isisValidPassword - sẽ return null
        if (!user || !isValidPassword) return null;

        // có return user
        return user;
    }

    // user truyền vào đã được xác thực ở local.strategy.ts rồi
    async login(user: any) {
        const payload = { username: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    async register(registerDto: CreateAuthDto) {
        // check email

        // hash password

        // 2 tác vụ trên truyền qua cho service handleRegister user xử lý
        return await this.userService.handleRegister(registerDto);
    }
}
