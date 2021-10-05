import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@modules/pets/repositories/prisma/PetRepositoryPrisma'
import SpecieRepositoryPrisma from '@modules/pets/repositories/prisma/SpecieRepositoryPrisma'
import FindPets from '@modules/pets/usecases/FindPets/FindPets'
import FindPetsController from '@modules/pets/usecases/FindPets/FindPetsController'

export default function makeFindPetsController ():Controller {
  const petRepository = new PetRepositoryPrisma()
  const specieRepository = new SpecieRepositoryPrisma()
  const findPets = new FindPets(petRepository, specieRepository)
  const findPetsController = new FindPetsController(findPets)

  return findPetsController
}
