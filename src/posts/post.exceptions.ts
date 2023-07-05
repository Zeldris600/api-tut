import { HttpException, HttpStatus } from "@nestjs/common";

export class MyPostNotFoundException extends HttpException {
    constructor(){
        super('Not Found ):', HttpStatus.NOT_FOUND)
    }
}