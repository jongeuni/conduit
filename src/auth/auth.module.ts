import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Auth, AuthSchema} from "./schemas/auth.schema";
import {JwtService} from "@nestjs/jwt";

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtService],
    exports: [AuthService, JwtService],
    imports: [MongooseModule.forFeature([{name:Auth.name, schema: AuthSchema}])]
})
export class AuthModule {

}