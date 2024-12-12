import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '@/users/users.service';
import { comparePassword } from '@/utils/comparePassword';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByEmail(username);
        const isValidPassword = await comparePassword(pass, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user._id, username: user.email };

        return {
            access_token: await this.jwtService.signAsync(payload) // ký ứng dụng thành công và trả về
        };
    }
}
