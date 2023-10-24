/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
// import { Post } from "./post.interface";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Post from "./post.entity";
import * as bcrypt from 'bcrypt';
import PostNotFound from "./exceptions/postNotFound.exception";


@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ) { }

    private lastPostId = 0;
    private posts: Post[] = [];


    /* --------   Finding Posts Using the Post Repository -------  */

    getAllPosts() {
        // const p = this.posts;
        return this.postsRepository.find();
    }



    async getPostById(id: number) {


        const post = await this.postsRepository.findOneBy({ id }); //findOne() dropped by TypeORM
        if (post) {
            return post
        }

        throw new PostNotFound(id);

        /* ----- Since we have a Post Repository posts No longer needed ------  */
        // try {
        //     const post = this.posts.find(id => post.id === id);
        //     if (post) {
        //         return post;
        //     }
        // } catch (error) {
        //     throw new HttpException({ // To create a custom error msg
        //         status: HttpStatus.NOT_FOUND,
        //         error: 'Sorry Post Not Found ):'
        //     }, HttpStatus.NOT_FOUND, {
        //         cause: error
        //     })
        //     //Default Erro msg
        //     //  throw new HttpException('Sorry Post Not Found', HttpStatus.NOT_FOUND)
        // }


    }


    /* --------   Creating Posts Using the Post Repository -------  */




    async createPost(post: CreatePostDto) {

        const newPost = await this.postsRepository.create(post);
        await this.postsRepository.save(newPost); // Populate DB with new entity
        return newPost;
        /*   const newPost = {
             id: ++this.lastPostId,
              ...post
          } */ 
    }

    /* --------   Updating Posts Using the Post Repository -------  */



    async updatePost(id: number, post: UpdatePostDto) {


        await this.postsRepository.update(id, post);
        const updatedPost = await this.postsRepository.findBy({ id });
        if (updatedPost) {
            return updatedPost
        }
        throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND)

        /*   try {
  
  
              const getPostIndexToUpdate = this.posts.findIndex(post => post.id === id);
              if (getPostIndexToUpdate > -1) {
                  this.posts[getPostIndexToUpdate] = post;
                  return post;
              }
          } catch (error) {
              throw new HttpException('Sorry Post Not Found', HttpStatus.NOT_FOUND)
          }
   */
    }

    /* --------   Deleting Posts Using the Post Repository -------  */


    async deletePost(id: number) {

        const deleteResponse = await this.postsRepository.delete(id); // The DELETE command gives us access to the count of removed items in the .affected property.
        if (!deleteResponse.affected) { // If .affected = 0, we can assume the post does not exist
            throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND)
        }


        /*   const postIndexToDelete = this.posts.findIndex(post => post.id === id);
        if (postIndexToDelete > -1) {
            this.posts.splice(postIndexToDelete, 1);
        } else {
            throw new HttpException('Post To Delete Not Found!', HttpStatus.NOT_FOUND);
        }
    } */
    }

}

// const hashFunc = async (text, salt) => {
//     try {
//         const hash = await bcrypt.hash(text,salt);
//         const isMatch = await bcrypt.compare(text,hash);
//         return isMatch;
//     } catch (error) {
//         throw new HttpException('DK', HttpStatus.UNAUTHORIZED)
//     }
// }

// const SALT = 10;

//   function hashFunc(password: string) {
//         return bcrypt.hash(password, SALT);
//  }


// console.log(hashFunc('123456789'));