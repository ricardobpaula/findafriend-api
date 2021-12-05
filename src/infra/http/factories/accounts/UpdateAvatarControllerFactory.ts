import Controller from '@domain/infra/gateways/Controller'
import UserRepositoryPrisma from '@core/repositories/prisma/UserRepositoryPrisma'
import UpdateAvatar from '@core/usecases/UpdateAvatar/UpdateAvatar'
import UpdateAvatarController from '@core/usecases/UpdateAvatar/UpdateAvatarController'

export default function makeUpdateAvatarController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const updateAvatar = new UpdateAvatar(userRepository)
  const updateAvatarController = new UpdateAvatarController(updateAvatar)

  return updateAvatarController
}
