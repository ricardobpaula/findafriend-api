import { Size } from '.prisma/client'
import { prisma } from '@infra/prisma/client'
import Pet from '@core/entities/Pet/Pet'
import PetMapper from '@core/mappers/PetMapper'
import { FindPetsRequest } from '@core/usecases/FindPets/FindPets'
import PetRepository from '../PetRepository'

export default class PetRepositoryPrisma implements PetRepository {
  async create (pet: Pet): Promise<void> {
    const data = PetMapper.toPersistence(pet.props)

    await prisma.pet.create({ data })
  }

  async find (params: FindPetsRequest): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      take: params.limit,
      skip: params.offset,
      where: {
        specie_id: { in: params?.species },
        size: params?.size as Size,
        adopted: params?.adopted
      },
      include: {
        specie: true
      }
    })

    return pets ? pets.map(pet => PetMapper.toDomain({ pet, specie: pet.specie })) : null
  }

  async findById (id: number): Promise<Pet> {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: { specie: true }
    })

    return pet ? PetMapper.toDomain({ pet, specie: pet.specie }) : null
  }
}
