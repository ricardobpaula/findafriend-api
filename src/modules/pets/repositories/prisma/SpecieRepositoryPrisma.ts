import { prisma } from '@infra/prisma/client'
import Specie from '@modules/pets/entities/Specie/Specie'
import SpecieMapper from '@modules/pets/mappers/SpecieMapper'
import SpecieRepository from '../SpecieRepository'

export default class SpecieRepositoryPrisma implements SpecieRepository {
  async createSpecie (specie: Specie): Promise<Specie> {
    const data = await SpecieMapper.toPersistence(specie.props)

    const newSpecie = await prisma.specie.create({ data })

    return SpecieMapper.toDomain(newSpecie)
  }

  async findOneByName (name: string): Promise<Specie> {
    const specie = await prisma.specie.findUnique({ where: { name } })
    return specie ? SpecieMapper.toDomain(specie) : null
  }

  async findManyByName (names: string[]): Promise<Specie[]> {
    const species = await prisma.specie.findMany({ where: { name: { in: names } } })

    return species ? species.map(specie => SpecieMapper.toDomain(specie)) : null
  }

  async findAll (): Promise<Specie[]> {
    const species = await prisma.specie.findMany()

    return species ? species.map(specie => SpecieMapper.toDomain(specie)) : null
  }
}
