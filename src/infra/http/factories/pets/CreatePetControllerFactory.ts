import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@core/repositories/prisma/PetRepositoryPrisma'
import SpecieRepositoryPrisma from '@core/repositories/prisma/SpecieRepositoryPrisma'
import CreatePet from '@core/usecases/CreatePet/CreatePet'
import CreatePetController from '@core/usecases/CreatePet/CreatePetController'

export default function makeCreatePetController () :Controller {
  const petRepository = new PetRepositoryPrisma()
  const specieRepository = new SpecieRepositoryPrisma()
  const createPet = new CreatePet(petRepository, specieRepository)
  const createSpecieController = new CreatePetController(createPet)

  return createSpecieController
}
