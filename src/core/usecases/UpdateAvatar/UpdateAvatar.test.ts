import User from '@core/entities/User/User'
import UserRepositoryInMemory from '@core/repositories/in-memory/UserRepositoryInMemory'
import UserRepository from '@core/repositories/UserRepository'
import UpdateAvatar from './UpdateAvatar'
import UserFactory from '@test/factories/UserFactory'
import { File } from '@domain/infra/gateways/UploadFileManager'

let userRepository: UserRepository
let updateAvatar: UpdateAvatar
let user: User

const photo = {
  date: new Date(),
  name: 'photo.png',
  originalName: 'photo.png',
  path: '/home/usr/pictures',
  size: 1024,
  type: 'image/png'
} as File

describe('Update avatar from user', () => {
  beforeEach(async () => {
    userRepository = new UserRepositoryInMemory()
    updateAvatar = new UpdateAvatar(userRepository)
    const userFactory = new UserFactory(userRepository)
    user = await userFactory.execute()
  })

  it('Should update avatar', async () => {
    const avatar = await updateAvatar.execute({ photo, userId: user.id })
    expect(!!avatar).toBeTruthy()
  })
})
