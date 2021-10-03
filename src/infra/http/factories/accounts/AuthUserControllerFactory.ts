import Controller from '@domain/infra/gateways/Controller'
import JtwAdapter from '@infra/gateways/JwtAdapter'
import UserRepositoryPrisma from '@modules/accounts/repositories/prisma/UserRepositoryPrisma'
import AuthUser from '@modules/accounts/usecases/AuthUser/AuthUser'
import AuthUserController from '@modules/accounts/usecases/AuthUser/AuthUserController'

export default function makeAuthUserController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const accessToken = new JtwAdapter()
  const authUser = new AuthUser(userRepository, accessToken)
  const authUserController = new AuthUserController(authUser)

  return authUserController
}
