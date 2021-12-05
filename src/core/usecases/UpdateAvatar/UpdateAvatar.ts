import { File } from '@domain/infra/gateways/UploadFileManager'
import UserRepository from '@core/repositories/UserRepository'

export type UpdateAvatarRequest = {
    photo: File,
    userId: number
}

export default class UpdateAvatar {
    private readonly userRepository: UserRepository

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
    }

    async execute ({ photo, userId }: UpdateAvatarRequest) {
      // TODO implements functionality
      console.log('fake save url')
    }
}
