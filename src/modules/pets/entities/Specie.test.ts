import Specie from './Specie'

const name = 'dog'

describe('Specie entity', ()=>{
    it('should create a new specie',()=>{
        const specie = new Specie({name})
        expect(specie.props.name).toBe(name)
    })
})