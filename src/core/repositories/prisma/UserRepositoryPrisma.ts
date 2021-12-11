import { prisma } from '@infra/prisma/client'

import User from '@core/entities/User/User'
import UserMapper from '@core/mappers/UserMapper'
import UserRepository from '../UserRepository'
import PhotoMapper from '@core/mappers/PhotoMapper'
import Photo from '@core/entities/Photo/Photo'

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

  async findAvatarByOwner (userId: number): Promise<Photo> {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { avatar: true } })
    const { avatar } = UserMapper.toDomain({ user, photo: user.avatar }).props
    return avatar
  }

  async createAvatar (photo: Photo, userId: number): Promise<Photo> {
    const data = PhotoMapper.toPersistence(photo)
    const user = await prisma.user.update({
      data: { avatar: { create: data } },
      include: { avatar: true },
      where: {
        id: userId
      }
    })
    const { avatar } = UserMapper.toDomain({ user, photo: user.avatar }).props
    return avatar
  }

  async updateAvatar (photo: Photo, userId: number): Promise<Photo> {
    const data = PhotoMapper.toPersistence(photo)
    const user = await prisma.user.update({
      data: { avatar: { update: data } },
      include: { avatar: true },
      where: {
        id: userId
      }
    })
    const { avatar } = UserMapper.toDomain({ user, photo: user.avatar }).props
    return avatar
  }
}
