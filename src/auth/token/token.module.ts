import {Module} from '@nestjs/common'
import {PassportModule} from '@nestjs/passport'
import {JwtModule} from '@nestjs/jwt'
import {jwtConstants} from "./constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret:jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [JwtStrategy],
})
export class TokenModule {}