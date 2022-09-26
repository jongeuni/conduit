import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Model} from "mongoose";


@Schema()
export class ArticleAuthor {
    @Prop()
    username: string;

    @Prop()
    bio: string;

    @Prop()
    image: string;

    @Prop()
    following: boolean
}

export const ArticleAuthorSchema = SchemaFactory.createForClass(ArticleAuthor);


@Schema()
export class Article {
    @Prop()
    slug: string;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    body: string;

    @Prop({type: [String]})
    tagList: string[];

    @Prop({type: Date, default: Date.now})
    createdAt: Date;

    @Prop({type: Date, default: Date.now})
    updatedAt: Date;

    @Prop({type: Boolean, default: false})
    favorited: boolean;

    @Prop({default:0})
    favoritesCount: number;

    @Prop({type: ArticleAuthorSchema})
    author: ArticleAuthor;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

export type ArticleModel = Model<Article>;
