/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Expose, Exclude } from "class-transformer";


@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true }) //Unique flag(Built-in functionality in PostgresSQL) inducates there shouldn't be two users with the same email.
    @Expose()
    public email: string;

    @Column()
    @Expose()
    public name: string;


    @Exclude()
    @Column()
    public password: string;

    @Exclude()
    public currentHashedRefreshToken?: string;


}

export default User;