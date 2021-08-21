import User from "../entities/User";

export default interface UserRepository {
    createUser(user: User): Promise<User>
}