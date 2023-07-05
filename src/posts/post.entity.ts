import { Transform } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('Posts')
class Post {
    @PrimaryGeneratedColumn()
    public id: number

    @Column()
    public title: string;

    @Column()
    public content: string;


    //Since category is a nullable column, it's optional and it's value is null untill we set it(This means sending null values in the response)
    //The above method is considered undesirable and we can fix this using the @Transform dec.
    @Column({ nullable: true })

    @Transform(({ value }) => {
        if (value !== null) {
            return value
        }
    })
    public category?: string;


}

export default Post;