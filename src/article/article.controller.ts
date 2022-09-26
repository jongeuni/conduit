import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Request, UseGuards} from '@nestjs/common';
import {ArticleListDto} from './dto/articleListDto';
import {ArticleService} from "./article.service";
import {ArticleCreateRq} from "./rqrs/articleCreateRq";
import {JwtAuthGuard} from "../auth/token/jwt.auth.guard";

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

    @Put(':slug')
    async updateArticle(@Body('article') rq: ArticleUpdateRq, @Param('slug') slug){
        return await this.articleService.updateArticle(rq.title, slug);
    }

    @Delete(':slug')
    @HttpCode(204)
    async deleteArticle (@Param('slug') slug) {
        await this.articleService.deleteArticle(slug);
    }

}
