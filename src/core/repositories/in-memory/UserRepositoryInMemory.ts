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

    createAvatar (photo: Photo, userId: string): Promise<Photo> {
      throw new Error('Method not implemented.')
    }

    updateAvatar (photo: Photo, userId: string): Promise<Photo> {
      throw new Error('Method not implemented.')
    }

    findAvatarByOwner (userId: string): Promise<Photo> {
      throw new Error('Method not implemented.')
    }
}
