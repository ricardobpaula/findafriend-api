import Controller from '@domain/infra/gateways/Controller'
import PetRepositoryPrisma from '@core/repositories/prisma/PetRepositoryPrisma'
import GetPet from '@core/usecases/GetPet/GetPet'
import GetPetController from '@core/usecases/GetPet/GetPetController'

export default function makeGetPetController (): Controller {
  const petRepository = new PetRepositoryPrisma()
  const getPet = new GetPet(petRepository)
  const getPetController = new GetPetController(getPet)

  return getPetController
}
