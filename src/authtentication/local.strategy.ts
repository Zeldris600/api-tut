import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import User from "src/users/user.entity";


@Injectable()

    /* Passport Strategies = differnt approaches to authentication. Here we'll implement the passport-local(strategy for authenticating with a username and password) strategy */

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authenticationService: AuthenticationService) {
        super({
            usernameField: 'email'
        });
    }


// 1- For every stratgey Passport calls the Validate function using a set of parameters specific for particular strategy. In this case, passport needs a username(email) and a password.
   async validate(email: string, password: string): Promise<User> {
        return this.authenticationService.getAuthenticatedUser(email, password)
    }
}