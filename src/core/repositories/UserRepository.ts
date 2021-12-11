import Photo from '@core/entities/Photo/Photo'
import User from '@core/entities/User/User'

export default interface UserRepository {
    createUser(user: User): Promise<User>
    findByEmail(email:string): Promise<User>
    findById(id: number): Promise<User>
    createAvatar(photo: Photo, userId: number):Promise<Photo>
    updateAvatar(photo: Photo, userId: number):Promise<Photo>
    findAvatarByOwner(userId: number):Promise<Photo>
}
