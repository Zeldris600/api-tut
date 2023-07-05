import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import JwtAuthenticationGuard from "src/authtentication/jwt-authentication.guard";
import { PostsService } from "./post.services";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import { ExceptionsFilterLogger } from "src/utils/exceptionsLogger.filter";
import { ValidateIdParam } from "src/utils/validateIdParam";



@Controller('posts')
export default class PostsController {
    constructor(
        private readonly postsService: PostsService
    ) { }

    @Get('all-posts')
    getAllPosts() {
        return this.postsService.getAllPosts();
    }

    @Get(':id')
    // @UseFilters(ExceptionsFilterLogger)
    getPostById(@Param() { id }: ValidateIdParam) {
        return this.postsService.getPostById(Number(id));
    } //@Param gives us a way to access route parameters

    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createPost(@Body() post: CreatePostDto) {
        return this.postsService.createPost(post);
    } //Get access to req.body using Nests' built-in @Body(). Method should be asynchronous

    @Put(':id')
    // @UseGuards(JwtAuthenticationGuard)
    async updatePost(@Body() post: UpdatePostDto, @Param('id') id: string) {
        return this.postsService.updatePost(Number(id), post);
    } //By Using the method's argument decorator we direct Nest to inject particular arguments into our methods(dependency Injection). Method should be asynchronous

    @Delete(':id')
    // @UseGuards(JwtAuthenticationGuard)
    async deletePost(@Param('id') id: string) {
        return this.postsService.deletePost(Number(id));
    }
}