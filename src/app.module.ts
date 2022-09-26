import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import {ArticleModule} from "./article/article.module";
import {AuthModule} from "./auth/auth.module";
import {TokenModule} from "./auth/token/token.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017', {
            dbName: 'conduit',
        }),
        ArticleModule,
        AuthModule,
        TokenModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
