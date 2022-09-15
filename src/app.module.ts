import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleController } from './article/article.controller';
import {ArticleService} from "./article/article.service";
import { AuthController } from './auth/auth.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {AuthService} from "./auth/auth.service";

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService,  AuthService],
  imports: [MongooseModule.forRoot('mongodb://localhost:27017', {
    dbName: 'article'
  })]
})
export class AppModule {}
