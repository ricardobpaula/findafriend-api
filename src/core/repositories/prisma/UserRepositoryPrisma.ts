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

  async updateUser (user: User): Promise<User> {
    const {
      first_name,
      last_name,
      email,
      phone
    } = await UserMapper.toPersistence(user.props)

    const userUpdated = await prisma.user.update({
      data: { first_name, last_name, email, phone },
      where: { id: user.id }
    })

    return UserMapper.toDomain({ user: userUpdated })
  }

  async findById (id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id }, include: { avatar: true } })

    return user ? UserMapper.toDomain({ user, photo: user.avatar }) : null
  }

  async findByEmail (email: string): Promise<User|undefined> {
    const user = await prisma.user.findUnique({ where: { email }, include: { avatar: true } })
    return user ? UserMapper.toDomain({ user, photo: user.avatar }) : null
  }

  async findAvatarByOwner (userId: string): Promise<Photo> {
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { avatar: true } })
    const { avatar } = UserMapper.toDomain({ user, photo: user.avatar }).props
    return avatar
  }

  async createAvatar (photo: Photo, userId: string): Promise<Photo> {
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

  async updateAvatar (photo: Photo, userId: string): Promise<Photo> {
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
