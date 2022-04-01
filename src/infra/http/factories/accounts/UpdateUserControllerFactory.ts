import UserRepositoryPrisma from '@core/repositories/prisma/UserRepositoryPrisma'
import UserUpdate from '@core/usecases/UpdateUser/UpdateUser'
import UserUpdateController from '@core/usecases/UpdateUser/UpdateUserController'
import Controller from '@domain/infra/gateways/Controller'

export default function makeUpdateUserController ():Controller {
  const userRepository = new UserRepositoryPrisma()
  const userUpdate = new UserUpdate(userRepository)
  const userUpdateController = new UserUpdateController(userUpdate)

  return userUpdateController
}
