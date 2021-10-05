import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import CreateSpecie from '../CreateSpecie/CreateSpecie'
import GetAllSpecies from './GetAllSpecies'

let specieRepositoryInMemory: SpecieRepositoryInMemory
let createSpecie: CreateSpecie

describe('Usecase to list all species', () => {
  beforeEach(async () => {
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    createSpecie = new CreateSpecie(specieRepositoryInMemory)
    await createSpecie.execute({ name: 'dog' })
    await createSpecie.execute({ name: 'cat' })
  })

  it('should be list all species', async () => {
    const getAllSpecies = new GetAllSpecies(specieRepositoryInMemory)
    const species = await getAllSpecies.execute()
    expect(species.length > 0).toBeTruthy()
  })

  it('List should be empty', async () => {
    const specieRepositoryInMemory1 = new SpecieRepositoryInMemory()
    const getAllSpecies = new GetAllSpecies(specieRepositoryInMemory1)
    const species = await getAllSpecies.execute()
    expect(species.length === 0).toBeTruthy()
  })
})
