import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@modules/pets/repositories/prisma/PetRepositoryPrisma'
import GetPet from '@modules/pets/usecases/GetPet/GetPet'
import GetPetController from '@modules/pets/usecases/GetPet/GetPetController'

export default function makeGetPetController (): Controller {
  const petRepository = new PetRepositoryPrisma()
  const getPet = new GetPet(petRepository)
  const getPetController = new GetPetController(getPet)

  return getPetController
}
