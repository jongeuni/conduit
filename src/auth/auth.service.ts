import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Auth, AuthModel} from "./schemas/auth.schema";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "./token/constants";

@Injectable()
export class AuthService {

    constructor(@InjectModel(Auth.name) private authModel: AuthModel,

                private jwtService: JwtService) {

    }

    async registration(rq: UserCreateRq): Promise<UserCreateRs> {

        rq.password= await bcrypt.hash(rq.password, 10);
        const user = await this.authModel.create(rq);

        return {
            user: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                email: user.email,
                token: this.jwtService.sign(this.getPayload(user), {
                    secret: jwtConstants.secret
                })
            }
        };
    }


    async login(rq: LoginRq) {

        const user = await this.authModel.findOne({
            email: rq.email
        }).exec();

        const pwCheck = await bcrypt.compare(rq.password, user.password);

        if(!pwCheck) {
            throw new HttpException('비밀번호 같지 않음 오류 !', HttpStatus.BAD_REQUEST);
        }

        return {
            user: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                email: user.email,
                token: this.jwtService.sign(this.getPayload(user), {
                    secret: jwtConstants.secret
                })
            }
        }


    }

    getPayload(user) {
        return {
            email: user.email,
            id: user.id,
            username: user.username,
            bio: user.bio,
            image: user.image,
            following: user.following
        }
    }
}