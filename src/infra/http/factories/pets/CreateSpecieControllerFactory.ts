import Controller from '@domain/infra/gateways/Controller'
import SpecieRepositoryPrisma from '@core/repositories/prisma/SpecieRepositoryPrisma'
import CreateSpecie from '@core/usecases/CreateSpecie/CreateSpecie'
import CreateSpecieController from '@core/usecases/CreateSpecie/CreateSpecieController'

export default function makeCreateSpecieController ():Controller {
  const specieRepository = new SpecieRepositoryPrisma()
  const createSpecie = new CreateSpecie(specieRepository)
  const createSpecieController = new CreateSpecieController(createSpecie)

  return createSpecieController
}
