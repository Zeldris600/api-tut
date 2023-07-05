import { IsNumberString } from "class-validator";

export class ValidateIdParam {
    @IsNumberString()

    id: string
}