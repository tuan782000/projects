import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    // b1 truy cập vào đường dẫn gửi lên thông tin
    @Post('login')
    @Public() // cái này mình tự viết - để tránh phân quyền cho chức năng login
    @UseGuards(LocalAuthGuard) // nestjs gửi qua guards để check user - middleware thư viện tự làm - cấu hình local.stratgtegy.ts - đăng ký bên module
    handleLogin(@Request() req) {
        // chạy xuống này kèm req
        return this.authService.login(req.user);
    }
    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    @Public() // ai cũng có thể dùng được - không yêu cầu token
    register(@Body() registerDto: CreateAuthDto) {
        return this.authService.register(registerDto);
    }
}
