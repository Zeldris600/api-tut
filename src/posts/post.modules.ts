import { Module } from "@nestjs/common";
import PostsController from "./post.controllers";
import {PostsService} from "./post.services";
import { TypeOrmModule } from "@nestjs/typeorm";
import Post from "./post.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Post])],
    controllers: [PostsController],
    providers: [PostsService]
})

export class PostsModule {}