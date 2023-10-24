/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import Post from "./post.entity";
import { PostSearchResult } from "./types/postSearchResult.interface";
import { PostSearchBody } from "./types/postSearchBody.interface";


@Injectable()
export default class PostsSearchService {
    index = 'posts'

    constructor(
        private readonly elasticSearchService: ElasticsearchService
    ) {}

    // async indexPost(post: Post) {
    //     return this.elasticSearchService.index<PostSearchResult, PostSearchBody>({
    //         index: this.index,
    //         body: {
    //             id: post.id,
    //             title: post.title,
    //             content: post.content,
    //             // authorId: post.author?.id
    //         }
    //     })
    // }
}