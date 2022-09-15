import {Body, Controller, Get, HttpCode, Post, Query} from '@nestjs/common';
import {ArticleListDto} from './dto/articleListDto';
import {ArticleService} from "./article.service";
import {ArticleCreateRq} from "./rqrs/articleCreateRq";
import {ArticleCreateRs} from "./rqrs/articleCreateRs";

@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    getArticle(@Query('limit') limit, @Query('offset') offset): ArticleListDto {
        return this.articleService.getArticles();
    }

    @Post()
    @HttpCode(201)
    async createArticle(@Body("article") rq: ArticleCreateRq): Promise<ArticleCreateRs> {
        return await this.articleService.createArticle(rq);
    }

}
