import Email from "../entities/email";
import UserProps from "../entities/interfaces/UserProps";
import User from "../entities/user";

export default interface UserRepository {
    createUser(user: UserProps): Promise<User>
    findByEmail(email:Email): Promise<User>
}