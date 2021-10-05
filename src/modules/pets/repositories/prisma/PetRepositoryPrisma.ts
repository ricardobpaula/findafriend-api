import { Size } from '.prisma/client'
import { prisma } from '@infra/prisma/client'
import Pet from '@modules/pets/entities/Pet/Pet'
import PetMapper from '@modules/pets/mappers/PetMapper'
import PetRepository, { FindPetParams } from '../PetRepository'

export default class PetRepositoryPrisma implements PetRepository {
  async createPet (pet: Pet): Promise<Pet> {
    const data = PetMapper.toPersistence(pet.props)

    const newPet = await prisma.pet.create({ data })

    return PetMapper.toDomain(newPet)
  }

  async find (params: FindPetParams): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      take: params.limit,
      skip: params.offset,
      where: {
        specie_id: { in: params?.speciesIds },
        size: params?.size as Size
      }
    })

    return pets ? pets.map(pet => PetMapper.toDomain(pet)) : null
  }
}
