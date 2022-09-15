import {Controller, Get, Query} from '@nestjs/common';
import {ArticleListDto} from './dto/articleListDto';
import {ArticleService} from "./article.service";

@Controller('api/articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    getArticle(@Query('limit') limit, @Query('offset') offset): ArticleListDto {
        return this.articleService.getArticles();
    }

}
