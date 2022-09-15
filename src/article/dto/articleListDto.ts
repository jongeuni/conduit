import {ArticleDto} from './articleDto';

export class ArticleListDto {
  readonly articles: ArticleDto[];
  readonly articlesCount: number;

  constructor(articles: ArticleDto[]) {
    this.articles = articles;
    this.articlesCount = 10
  }
}
