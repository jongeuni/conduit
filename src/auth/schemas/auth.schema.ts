import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Schema()
export class Auth {
    @Prop()
    username:string;
    @Prop({unique:true})
    email:string;
    @Prop()
    password:string;
    @Prop({default:null})
    bio:string;
    @Prop({default:'http://www.nie.re.kr/endangered_species/getMultiImage.do?thumbYn=Y&spcs_mltmd_sn=1000676'})
    image:string;
    @Prop({default:false})
    following:boolean; /// 돌리기전에이거ㅜ가함
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

export type AuthModel = Model<Auth>;

