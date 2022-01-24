import { prisma } from '@infra/prisma/client'
import RefreshToken from '@core/entities/RefreshToken/RefreshToken'
import User from '@core/entities/User/User'
import RefreshTokenRepository from '../RefreshTokenRepository'
import RefreshTokenMapper from '@core/mappers/RefreshTokenMapper'
import UserMapper from '@core/mappers/UserMapper'

export default class RefreshTokenRepositoryPrisma implements RefreshTokenRepository {
  async create (user: User): Promise<RefreshToken> {
    const expiresIn = new Date()
    expiresIn.setMonth(expiresIn.getMonth() + 1)
    const refreshToken = await prisma.refreshToken.create({
      data: {
        user_id: user.id,
        expires_in: expiresIn
      }
    })
    return RefreshTokenMapper.toDomain({ refreshToken, user })
  }

  async delete (refreshToken: RefreshToken): Promise<void> {
    await prisma.refreshToken.delete({ where: { id: refreshToken.id } })
  }

  async findById (id: string): Promise<RefreshToken> {
    const refreshToken = await prisma.refreshToken.findUnique({ where: { id }, include: { user: true } })
    if (!refreshToken) {
      return undefined
    }
    const user = UserMapper.toDomain({ user: refreshToken.user })
    return RefreshTokenMapper.toDomain({ refreshToken, user })
  }

  async find (user: User): Promise<RefreshToken> {
    const refreshToken = await prisma.refreshToken.findUnique({ where: { user_id: user.id } })
    return refreshToken ? RefreshTokenMapper.toDomain({ refreshToken, user }) : undefined
  }
}
