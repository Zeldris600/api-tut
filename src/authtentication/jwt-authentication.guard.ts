import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


//Use Guard to auth users before making requests to our Api
@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}