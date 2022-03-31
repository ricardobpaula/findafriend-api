import { v4 as uuid } from 'uuid'

import PasswordFactory from '@core/factories/PasswordFactory'
import User from '@core/entities/User/User'
import UserRepository from '../UserRepository'
import Photo from '@core/entities/Photo/Photo'

export default class implements UserRepository {
    private items: Array<User>

    constructor () {
      this.items = []
    }

    async findById (id: string): Promise<User> {
      return this.items.find(item => item.id === id)
    }

    async findByEmail (email: string): Promise<User> {
      return this.items.find(item => item.props.email.value === email)
    }

    async createUser (user: User): Promise<User> {
      const {
        email,
        firstName,
        lastName,
        password,
        phone,
        avatar,
        isFinding,
        role
      } = user.props

      const passwordOrError = PasswordFactory(await password.getHashed(), true)

      if (passwordOrError.isLeft()) {
        throw passwordOrError.value
      }

      const userOrError = User.create({
        email,
        firstName,
        lastName,
        password,
        phone,
        avatar,
        isFinding,
        role
      }, uuid(), new Date(), new Date())

      if (userOrError.isLeft()) {
        throw userOrError.value
      }

      const newUser = userOrError.value
      this.items.push(newUser)

      return newUser
    }

    async updateUser (user: User): Promise<User> {
      const index = this.items.findIndex(item => item.id === user.id)
      const { firstName, lastName, email, phone } = user.props
      const { id, createdAt, updatedAt, props } = this.items[index]
      const userUpdated = User.create({
        ...props,
        firstName,
        lastName,
        phone,
        email
      }, id, createdAt, updatedAt)

      if (userUpdated.isLeft()) {
        throw userUpdated.value
      }
      this.items[index] = userUpdated.value
      return this.items[index]
    }

    async createAvatar (photo: Photo, userId: string): Promise<Photo> {
      const avatar = Photo.create(photo.props, uuid(), new Date(), new Date())
      const index = this.items.findIndex(item => item.id === userId)
      this.items[index].props.avatar = avatar
      return avatar
    }

    async updateAvatar (photo: Photo, userId: string): Promise<Photo> {
      const avatar = Photo.create(photo.props, uuid(), new Date(), new Date())
      const index = this.items.findIndex(item => item.id === userId)
      this.items[index].props.avatar = avatar
      return avatar
    }

    async findAvatarByOwner (userId: string): Promise<Photo> {
      const user = this.items.find(item => item.id === userId)
      return user.props.avatar
    }
}
