import Email from "../entities/Email";
import UserProps from "../entities/interfaces/UserProps";
import User from "../entities/User";

export default interface UserRepository {
    createUser(user: UserProps): Promise<User>
    findByEmail(email:Email): Promise<User>
}