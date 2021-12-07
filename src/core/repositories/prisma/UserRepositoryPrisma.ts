import { prisma } from '@infra/prisma/client'

import User from '@core/entities/User/User'
import UserMapper from '@core/mappers/UserMapper'
import UserRepository from '../UserRepository'

export default class UserRepositoryPrisma implements UserRepository {
  async createUser (user: User): Promise<User> {
    const data = await UserMapper.toPersistence(user.props)

    const newUser = await prisma.user.create({ data })

    return UserMapper.toDomain({ user: newUser })
  }

  async findById (id: number): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id }, include: { avatar: true } })

    return user ? UserMapper.toDomain({ user }) : null
  }

  async findByEmail (email: string): Promise<User|undefined> {
    const user = await prisma.user.findUnique({ where: { email }, include: { avatar: true } })
    return user ? UserMapper.toDomain({ user, photo: user.avatar }) : null
  }
}
