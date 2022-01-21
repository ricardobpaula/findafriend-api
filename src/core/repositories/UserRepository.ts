import Photo from '@core/entities/Photo/Photo'
import User from '@core/entities/User/User'

export default interface UserRepository {
    createUser(user: User): Promise<User>
    findByEmail(email:string): Promise<User>
    findById(id: string): Promise<User>
    createAvatar(photo: Photo, userId: string):Promise<Photo>
    updateAvatar(photo: Photo, userId: string):Promise<Photo>
    findAvatarByOwner(userId: string):Promise<Photo>
}
