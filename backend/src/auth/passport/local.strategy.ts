import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password); // nơi nhận null hoặc user
        // nếu null - falsy - ! -> truthy - trả về message
        if (!user) {
            throw new UnauthorizedException('Username or password invalid');
        }
        return user; // vượt qua hết trả về user
    }
}
