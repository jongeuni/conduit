import {Body, Controller, Get, HttpCode, Post, Query} from '@nestjs/common';
import {ArticleListDto} from './dto/articleListDto';
import {ArticleService} from "./article.service";
import {ArticleCreateRq} from "./rqrs/articleCreateRq";
import {ArticleCreateRs} from "./rqrs/articleCreateRs";

@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    async getArticle(@Query('limit') limit, @Query('offset') offset): Promise<ArticleListDto> {
        return await this.articleService.getArticles();
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createArticle(@Body("article") articleRq: ArticleCreateRq, @Request() req){
        return await this.articleService.createArticle(articleRq, req.user);
    }

}
