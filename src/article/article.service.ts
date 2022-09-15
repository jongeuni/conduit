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

    getArticles(): ArticleListDto {
        return new ArticleListDto(this.getArticleList());
    }

    getArticleList(): ArticleDto[] {
        return new Array(10).fill(null).map((_, index) => {
            return new ArticleDto(`${index} count title`);
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
