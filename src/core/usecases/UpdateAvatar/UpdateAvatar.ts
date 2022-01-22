import { File } from '@domain/infra/gateways/UploadFileManager'
import UserRepository from '@core/repositories/UserRepository'
import Photo from '@core/entities/Photo/Photo'

export type UpdateAvatarRequest = {
    photo: File,
    userId: string
}

export default class UpdateAvatar {
    private readonly userRepository: UserRepository

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
    }

    async execute ({ photo, userId }: UpdateAvatarRequest): Promise<Photo> {
      const avatarExists = await this.userRepository.findAvatarByOwner(userId)
      if (avatarExists) {
        const avatar = Photo.create(
          photo,
          avatarExists.id,
          avatarExists.createdAt,
          avatarExists.updatedAt
        )
        return await this.userRepository.updateAvatar(avatar, userId)
      } else {
        const avatar = Photo.create(photo)
        return await this.userRepository.createAvatar(avatar, userId)
      }
    }
}
