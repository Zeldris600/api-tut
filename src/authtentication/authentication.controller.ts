import { Controller, Get, Body, Req, HttpCode, Post, UseGuards, Res, Response, UsePipes, SerializeOptions, UseInterceptors, ClassSerializerInterceptor } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import RequestWithUser from "./requestWithUser.interface";
import { response } from "express";
import { ValidationPipe } from "@nestjs/common";

import JwtAuthenticationGuard from "./jwt-authentication.guard";

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) { }

    // @UseGuards(JwtAuthenticationGuard)
    @UseGuards(LocalAuthenticationGuard) //passport. will authenticate the request. By default, when authentication succeeds, the req.user property is set to the authenticated user,
    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    authenticate(@Req() request: RequestWithUser) {
        const user = request.user;
        //    user.password = undefined;
        console.log(user);

        return user;
    }

    @Post('register')
    // @UsePipes(ValidationPipe)
    async register(@Body() registrationData: RegisterDto) {
        return this.authenticationService?.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('log-in')
    async logIn(@Req() request: RequestWithUser, @Res() response) {
        const { user } = request;

        // console.log(request);

        // Send token created when user logs in the Set-Cookie header using the Response object
        // When the browser receives this response, it sets the cookie for later use.
        const cookie = this.authenticationService.getCookieWithToken(user.id);

        response.setHeader('Set-Cookie', cookie);
        // user.password = undefined;
        return response.send(user);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('log-out')
    async logOut(@Req() request: RequestWithUser, @Res() response) {
        response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
        return response.sendStatus(200);
    }
}