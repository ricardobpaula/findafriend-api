import PasswordFactory from '@modules/accounts/factories/PasswordFactory'
import User from '../../entities/User'
import UserRepository from '../UserRepository'

export default class implements UserRepository {
    private itens: Array<User>

    constructor () {
      this.itens = []
    }

    async findByEmail (email: string): Promise<User> {
      return this.itens.find(item => item.props.email.value === email)
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

      const passwordHashed = PasswordFactory(await password.getHashed(), true)

      const newUser = User.create({
        email,
        firstName,
        lastName,
        password: passwordHashed,
        phone,
        avatar,
        isFinding,
        role
      }, this.itens.length + 1)
      this.itens.push(newUser)

      return newUser
    }
}
