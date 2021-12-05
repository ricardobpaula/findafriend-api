import Controller from '@domain/infra/gateways/Controller'
import UserRepositoryPrisma from '@core/repositories/prisma/UserRepositoryPrisma'
import CreateUser from '@core/usecases/CreateUser/CreateUser'
import CreateUserController from '@core/usecases/CreateUser/CreateUserController'

export default function makeCreateUserController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const createUser = new CreateUser(userRepository)
  const createUserController = new CreateUserController(createUser)

  return createUserController
}
