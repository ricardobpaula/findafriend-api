import UserProps from '../../entities/interfaces/UserProps'
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

    async createUser (user: UserProps): Promise<User> {
      const newUser = User.create(user, this.itens.length + 1)
      this.itens.push(newUser)
      return newUser
    }
}
