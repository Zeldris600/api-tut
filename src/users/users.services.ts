/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "./user.entity";
import CreateUserDto from "./dto/createUser.dto";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    private logger = new Logger('UsersService')
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async getByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email });
        if (user) {
            return user;
        } throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
    }

    async getById(id: number) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
            return user;
        }
        throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND)
    }

    async create(userData: CreateUserDto) {
        try {
            const newUser = this.usersRepository.create(userData);
            await this.usersRepository.save(newUser);
            console.log(newUser, 'User To be saved in DB!!')
            return newUser;
        } catch (error) {
            console.log(error);
            throw new HttpException('Something Went Wrong!', HttpStatus.NOT_IMPLEMENTED);
        }

    }
}




