import Controller from '@domain/infra/gateways/Controller'
import SpecieRepositoryPrisma from '@modules/pets/repositories/prisma/SpecieRepositoryPrisma'
import CreateSpecie from '@modules/pets/usecases/CreateSpecie/CreateSpecie'
import CreateSpecieController from '@modules/pets/usecases/CreateSpecie/CreateSpecieController'

export default function makeCreateSpecieController ():Controller {
  const specieRepository = new SpecieRepositoryPrisma()
  const createSpecie = new CreateSpecie(specieRepository)
  const createSpecieController = new CreateSpecieController(createSpecie)

  return createSpecieController
}
