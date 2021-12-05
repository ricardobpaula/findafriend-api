import { prisma } from '@infra/prisma/client'
import Specie from '@core/entities/Specie/Specie'
import SpecieMapper from '@core/mappers/SpecieMapper'
import SpecieRepository from '../SpecieRepository'

export default class SpecieRepositoryPrisma implements SpecieRepository {
  async create (specie: Specie): Promise<Specie> {
    const data = SpecieMapper.toPersistence(specie.props)
    const newSpecie = await prisma.specie.create({ data })
    return SpecieMapper.toDomain(newSpecie)
  }

  async findByid (id: number): Promise<Specie> {
    const specie = await prisma.specie.findUnique({ where: { id } })
    return specie ? SpecieMapper.toDomain(specie) : null
  }

  async findByName (name: string): Promise<Specie> {
    const specie = await prisma.specie.findUnique({ where: { name } })
    return specie ? SpecieMapper.toDomain(specie) : null
  }

  async findAll (): Promise<Specie[]> {
    const species = await prisma.specie.findMany()
    return species ? species.map(specie => SpecieMapper.toDomain(specie)) : null
  }
}
