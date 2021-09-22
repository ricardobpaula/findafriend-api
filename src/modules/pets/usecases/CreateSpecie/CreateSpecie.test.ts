import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import CreateSpecie from './CreateSpecie'

let specieRepositoryInMemory: SpecieRepositoryInMemory
let createSpecie: CreateSpecie

describe('Usecase create specie', () => {
  beforeEach(() => {
    specieRepositoryInMemory = new SpecieRepositoryInMemory()
    createSpecie = new CreateSpecie(specieRepositoryInMemory)
  })

  it('should be created a new specie', async () => {
    const specieOrError = await createSpecie.execute({ name: 'dog' })
    console.log(specieOrError)
    expect(specieOrError.isRight()).toBeTruthy()
  })

  it('Should reject create species with the same name', async () => {
    const specieOrError1 = await createSpecie.execute({ name: 'dog' })
    console.log(specieOrError1)
    expect(specieOrError1.isRight()).toBeTruthy()

    const specieOrError2 = await createSpecie.execute({ name: 'dog' })
    console.log(specieOrError2)
    expect(specieOrError2.isLeft()).toBeTruthy()
  })

  it('should reject specie with name less than 3 characters', async () => {
    const specieOrError = await createSpecie.execute({ name: 'do' })
    expect(specieOrError.isLeft()).toBeTruthy()
  })

  it('should reject specie with name more than 25 characters', async () => {
    const specieOrError = await createSpecie.execute({ name: 'a'.repeat(26) })
    console.log(specieOrError)
    expect(specieOrError.isLeft()).toBeTruthy()
  })
})
