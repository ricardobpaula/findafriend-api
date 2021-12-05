import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@core/repositories/prisma/PetRepositoryPrisma'
import FindPets from '@core/usecases/FindPets/FindPets'
import FindPetsController from '@core/usecases/FindPets/FindPetsController'

export default function makeFindPetsController ():Controller {
  const petRepository = new PetRepositoryPrisma()
  const findPets = new FindPets(petRepository)
  const findPetsController = new FindPetsController(findPets)

  return findPetsController
}
