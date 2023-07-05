import { NotFoundException } from "@nestjs/common";

export default class PostNotFound extends NotFoundException {
    constructor(postId: Number) {
        super(`Post with id ${postId} not found`)
    }
}