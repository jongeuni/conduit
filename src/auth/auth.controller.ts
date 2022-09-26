import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('api/users')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    registration(@Body("user") rq:UserCreateRq) {
        return this.authService.registration(rq);
    }

    @Post("/login")
    login(@Body("user") rq:LoginRq){
        return this.authService.login(rq);
    }
}
