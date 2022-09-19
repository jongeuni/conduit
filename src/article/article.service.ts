import {Injectable} from "@nestjs/common";
import {ArticleListDto} from "./dto/articleListDto";
import {ArticleDto} from "./dto/articleDto";
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleModel} from "./schemas/article.schema";
import {ArticleCreateRq} from "./rqrs/articleCreateRq";

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: ArticleModel) {
    }

    async getArticles(): Promise<ArticleListDto> {
        return new ArticleListDto(await this.getArticleList());
    }

    async  getArticleList() : Promise<ArticleDto[]> {
        const articles = await this.articleModel.find().exec();

        return articles.map((article)=> {
            return new ArticleDto(article);
        });
    }

    async createArticle(rq: ArticleCreateRq): Promise<Article> {
        const article: CreateArticleDto = {
            ...rq,
            slug: 'slug',
            author: {
                username: 'user name',
                bio: '?',
                image: 'image',
                following: false
            }
        };
        return await this.articleModel.create(article);
    }
}
