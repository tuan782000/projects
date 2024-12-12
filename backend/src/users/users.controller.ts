import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(
        @Query() query: string,
        @Query() current: string,
        @Query() pageSize: string
    ) {
        return this.usersService.findAll(query, +current, +pageSize); // thực hiện ép kiểu cho current và pageSize bằng cách +
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // Mình đã kẹp id vào trong body - mở UpdateUserDto sẽ thấy
    @Patch('')
    update(@Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(updateUserDto);
    }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

    // @Delete(':id') // id là kiểu số +id ép kiểu về số
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}
