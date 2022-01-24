import Controller from '@domain/infra/gateways/Controller'
import JtwAdapter from '@infra/gateways/JwtAdapter'
import UserRepositoryPrisma from '@core/repositories/prisma/UserRepositoryPrisma'
import RefreshTokenRepositoryPrisma from '@core/repositories/prisma/RefreshTokenReposityPrisma'
import AuthUser from '@core/usecases/AuthUser/AuthUser'
import AuthUserController from '@core/usecases/AuthUser/AuthUserController'

export default function makeAuthUserController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const refreshTokenReposity = new RefreshTokenRepositoryPrisma()
  const accessToken = new JtwAdapter()
  const authUser = new AuthUser(userRepository, refreshTokenReposity, accessToken)
  const authUserController = new AuthUserController(authUser)

  return authUserController
}
