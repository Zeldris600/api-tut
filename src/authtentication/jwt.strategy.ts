/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { UsersService } from "src/users/users.services";
import { TokenPayload } from "./tokenPayload.interface";

@Injectable()
    //Extend the default JWT strategy by reading token from user
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
           private readonly configService: ConfigService,
           private readonly userService: UsersService,

    ) {
        //Extract token from user cookies
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET')
        })
    }
   //Use user Id encodeded! Get User data with validate fn
    async validate(payload: TokenPayload) {
        return this.userService.getById(payload.userId)
    }
}