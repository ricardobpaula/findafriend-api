import UserRepositoryPrisma from '@core/repositories/prisma/UserRepositoryPrisma'
import ViewProfile from '@core/usecases/ViewProfile/ViewProfile'
import ViewProfileController from '@core/usecases/ViewProfile/ViewProfileController'
import Controller from '@domain/infra/gateways/Controller'

export default function makeViewProfileController ():Controller {
  const userRepository = new UserRepositoryPrisma()
  const viewProfile = new ViewProfile(userRepository)
  const viewProfileController = new ViewProfileController(viewProfile)

  return viewProfileController
}
