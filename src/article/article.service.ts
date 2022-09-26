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

    createRandomSlug() {
        return Math.random().toString();
    }

    async createArticle(rq: ArticleCreateRq, user): Promise<ArticleRs> {


        const articleDto: CreateArticleDto = {
            ...rq,
            slug: this.createRandomSlug(),
            author: {
                username: user.username,
                bio: user.bio,
                image: user.image,
                following: user.following
            }
        };

        const article = await this.articleModel.create(articleDto);

        return {
            article: {
                ...articleDto,
                createdAt: article.createdAt,
                updatedAt: article.updatedAt,
                favorited: article.favorited,
                favoritesCount: article.favoritesCount
            }
        }
    }
