import { Controller, Get, Req } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    all(@Req() request: Request): string{
        return 'User 3 is good'; 
    }
}
