import Controller from '@domain/infra/gateways/Controller'
import UserRepositoryPrisma from '@modules/accounts/repositories/prisma/UserRepositoryPrisma'
import UpdateAvatar from '@modules/accounts/usecases/UpdateAvatar/UpdateAvatar'
import UpdateAvatarController from '@modules/accounts/usecases/UpdateAvatar/UpdateAvatarController'

export default function makeUpdateAvatarController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const updateAvatar = new UpdateAvatar(userRepository)
  const updateAvatarController = new UpdateAvatarController(updateAvatar)

  return updateAvatarController
}
