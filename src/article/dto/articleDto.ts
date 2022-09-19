import {Article} from "../schemas/article.schema";

export class ArticleDto {
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly favorited: boolean;
  readonly favoritesCount: number;
  readonly author: Auther;

  constructor(
      article: Readonly<Article>
  ) {
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.tagList = article.tagList;
    this.createdAt = article.createdAt;
    this.updatedAt =article.updatedAt;
    this.favorited = article.favorited;
    this.favoritesCount = article.favoritesCount;
    this.slug = article.slug.toString();
    this.author = article.author;
  }


}
