import Controller from '@domain/infra/gateways/Controller'
import UserRepositoryPrisma from '@modules/accounts/repositories/prisma/UserRepositoryPrisma'
import CreateUser from '@modules/accounts/usecases/CreateUser/CreateUser'
import CreateUserController from '@modules/accounts/usecases/CreateUser/CreateUserController'

export default function makeCreateUserController (): Controller {
  const userRepository = new UserRepositoryPrisma()
  const createUser = new CreateUser(userRepository)
  const createUserController = new CreateUserController(createUser)

  return createUserController
}
