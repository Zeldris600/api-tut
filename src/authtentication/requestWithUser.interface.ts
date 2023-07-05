import { Request } from "@nestjs/common";
import User from "src/users/user.entity";

//We extending Request intertface so that the user's data is attached to the Node's request object.
interface RequestWithUser extends Request {
    user: User;
}

export default RequestWithUser;