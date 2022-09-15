export class ArticleDto {
  readonly slug: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly favorited: boolean;
  readonly favoritesCount: number;
  readonly author: Auther;

  constructor(
      readonly title: string
  ) {
    this.description = '';
    this.body = 'zz';
    this.tagList = ['tag one', 'tag tow'];
    this.createdAt = '2021-11-24T12:11:08.212Z';
    this.updatedAt ='2021-11-24T12:11:08.212Z';
    this.favorited = false;
    this.favoritesCount = 3860;
    this.slug = 'z';
    this.author = {
      username: "Gerome",
      bio: null,
      image: "https://api.realworld.io/images/demo-avatar.png",
      following: false
    }
  }
}
