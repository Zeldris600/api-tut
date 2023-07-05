import { UsersService } from "src/users/users.services";
import RegisterDto from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { TokenPayload } from "./tokenPayload.interface";

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    /* Register User, Hash Password & Verify Password is Unique */

    public async register(registrationData: RegisterDto) {

        //  ===> Store user in DB! {Not Executed!} ====>>>: userService not being loaded!
        try {
            const hashedPassword = await bcrypt.hash(registrationData.password, 10);

            const createdUser = await this.userService.create({
                ...registrationData,
                password: hashedPassword
            });

            // createdUser.password = undefined; // Do not send password in a response
            // console.log(createdUser);
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);

            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /* Loggin in implementation, Verify Email, Throw the same error to prevent attackers from getting a list of emails registerd in our DB.  */
    public async getAuthenticatedUser(email: string, plainPassword: string) {
        try {
            const user = await this.userService.getByEmail(email);
            await this.verifyPassword(plainPassword, user.password);
            // user.password = undefined;
            return user
        } catch (error) {
            throw new HttpException('Wrong credentials!', HttpStatus.BAD_REQUEST);
        }
    }


    /* Verify User Password */
    public async verifyPassword(plainPassword: string, hashedPassword: string) {
        const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword);
        if (!verifyPassword) {
            throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST)
        }
    }

    public getCookieWithToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication = ${token}; HttpOnly; Path=/; Max-Age${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }


    /* Logging out: Since we can't change a token easily. The easiest way to implement logging out is just to remove the token from the browser */

    public getCookieForLogOut() {
        return `Authentication=; HttpOnly; Path=/; Max-Age=0`;

    }
}