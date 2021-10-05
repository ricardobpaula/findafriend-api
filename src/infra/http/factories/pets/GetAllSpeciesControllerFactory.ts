import Controller from '@domain/infra/gateways/Controller'
import SpecieRepositoryPrisma from '@modules/pets/repositories/prisma/SpecieRepositoryPrisma'
import GetAllSpecies from '@modules/pets/usecases/GetAllSpecies/GetAllSpecies'
import GetAllSpeciesController from '@modules/pets/usecases/GetAllSpecies/GetAllSpeciesController'

export default function makeGetAllSpeciesController ():Controller {
  const specieRepository = new SpecieRepositoryPrisma()
  const getAllSpecies = new GetAllSpecies(specieRepository)
  const getAllSpeciesController = new GetAllSpeciesController(getAllSpecies)

  return getAllSpeciesController
}
