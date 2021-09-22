import { prisma } from '@infra/prisma/client'

import User from '@modules/accounts/entities/User'
import UserMapper from '@modules/accounts/mapper/UserMapper'
import UserRepository from '../UserRepository'

export default class UserRepositoryPrisma implements UserRepository {
  async findById (id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } })

    return UserMapper.toDomain(user)
  }

  async createUser (user: User): Promise<User> {
    const data = await UserMapper.toPersistence(user.props)

    const newUser = await prisma.user.create({ data })

    return UserMapper.toDomain(newUser)
  }

  async findByEmail (email: string): Promise<User|undefined> {
    const userRaw = await prisma.user.findUnique({ where: { email } })

    if (userRaw) {
      const user = UserMapper.toDomain(userRaw)

      return user
    }
  }
}
