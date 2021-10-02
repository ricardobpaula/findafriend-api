import PasswordFactory from '@modules/accounts/factories/PasswordFactory'
import User from '../../entities/User'
import UserRepository from '../UserRepository'

export default class implements UserRepository {
    private items: Array<User>

    constructor () {
      this.items = []
    }

    async findById (id: number): Promise<User> {
      return this.items[id - 1]
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
      }, this.items.length + 1)

      if (userOrError.isLeft()) {
        throw userOrError.value
      }

      const newUser = userOrError.value
      this.items.push(newUser)

      return newUser
    }
}
