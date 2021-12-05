import User from '@core/entities/User/User'

export default interface UserRepository {
    createUser(user: User): Promise<User>
    findByEmail(email:string): Promise<User>
    findById(id: number): Promise<User>
}
