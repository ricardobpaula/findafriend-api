import SpecieRepositoryInMemory from '../../repositories/in-memory/SpecieRepositoryInMemory'
import CreateSpecie from './CreateSpecie'
import SpecieAlreadyExists from './errors/SpecieAlreadyExists'

const name = 'dog'
let specieRepositoryInMemory: SpecieRepositoryInMemory
let createSpecie: CreateSpecie
describe('Usecase create specie',()=>{
    beforeEach(()=>{
        specieRepositoryInMemory = new SpecieRepositoryInMemory()
        createSpecie = new CreateSpecie(specieRepositoryInMemory)
    })

    it('should be created a new specie', async () => {

        const specie = await createSpecie.execute({name})
        expect(specie.props.name).toBe(name)
    })

    it('should be not able to create the same specie', async () => {
        await createSpecie.execute({name})
        expect( async()=>{
            await createSpecie.execute({name})
        }).rejects.toThrowError(SpecieAlreadyExists)
    })

})