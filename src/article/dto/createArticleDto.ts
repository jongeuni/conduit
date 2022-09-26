interface CreateArticleDto {
    title:string;
    description:string;
    body:string;
    tagList:string[];
    slug:string;
    author: Auther;
}

interface ArticleData {
    title:string;
    description:string;
    body:string;
    tagList:string[];
    slug:string;
    author: Auther;
    createdAt: Date;
    updatedAt: Date;
    favorited: boolean;
    favoritesCount: number;
}

interface ArticleRs {
    article: ArticleData;
}