import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ArticleListDto} from "./dto/articleListDto";
import {ArticleDto} from "./dto/articleDto";
import {InjectModel} from "@nestjs/mongoose";
import {Article, ArticleModel} from "./schemas/article.schema";
import {ArticleCreateRq} from "./rqrs/articleCreateRq";

class ArticleNotExistException extends HttpException {
    constructor() {
        super('아티클이 존재하지 않습니다', HttpStatus.NOT_FOUND);
    }
}

@Injectable()
export class ArticleService {
    constructor(@InjectModel(Article.name) private articleModel: ArticleModel,
               ) {
    }

    async getArticles(): Promise<ArticleListDto> {
        return new ArticleListDto(await this.getArticleList());
    }

    async getArticleList(): Promise<ArticleDto[]> {
        const articles = await this.articleModel.find().exec();

        return articles.map((article) => {
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


    async updateArticle(title: string, slug: string) {
        console.log(slug);

        const article = await this.articleModel.findOneAndUpdate(
            {
                slug: slug
            },
            {
                title: title
            },
            {
                new: true
            }
        ).exec();

        return {
            article: {
                author: article?.author ?? '',
                body: article.body,
                createdAt: article.createdAt,
                description: article.description,
                favorited: article.favorited,
                favoritesCount: article.favoritesCount,
                slug: article.slug,
                tagList: article.tagList,
                title: article.title,
                updatedAt: article.updatedAt
            }

        }

    }

    async deleteArticle(slug: string) {
        if (await this.articleModel.exists({slug})) {
            await this.articleModel.deleteOne({
                slug: slug
            }).exec();
        } else {
            throw new ArticleNotExistException();
        }
    }
}