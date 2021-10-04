import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@modules/pets/repositories/prisma/PetRepositoryPrisma'
import SpecieRepositoryPrisma from '@modules/pets/repositories/prisma/SpecieRepositoryPrisma'
import CreatePet from '@modules/pets/usecases/CreatePet/CreatePet'
import CreatePetController from '@modules/pets/usecases/CreatePet/CreatePetController'

export default function makeCreatePetController () :Controller {
  const petRepository = new PetRepositoryPrisma()
  const specieRepository = new SpecieRepositoryPrisma()
  const createPet = new CreatePet(petRepository, specieRepository)
  const createSpecieController = new CreatePetController(createPet)

  return createSpecieController
}
