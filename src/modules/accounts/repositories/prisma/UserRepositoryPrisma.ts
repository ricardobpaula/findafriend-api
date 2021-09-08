import { prisma } from '@infra/prisma/client'

import UserProps from '@modules/accounts/entities/interfaces/UserProps'
import User from '@modules/accounts/entities/User'
import UserMapper from '@modules/accounts/mapper/UserMapper'
import UserRepository from '../UserRepository'

export default class UserRepositoryPrisma implements UserRepository {
  async createUser (user: UserProps): Promise<User> {
    const data = await UserMapper.toPersistence(user)

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
