import Controller from '@domain/infra/gateways/Controller'
import SpecieRepositoryPrisma from '@core/repositories/prisma/SpecieRepositoryPrisma'
import GetAllSpecies from '@core/usecases/GetAllSpecies/GetAllSpecies'
import GetAllSpeciesController from '@core/usecases/GetAllSpecies/GetAllSpeciesController'

export default function makeGetAllSpeciesController ():Controller {
  const specieRepository = new SpecieRepositoryPrisma()
  const getAllSpecies = new GetAllSpecies(specieRepository)
  const getAllSpeciesController = new GetAllSpeciesController(getAllSpecies)

  return getAllSpeciesController
}
