import UserProps from '../../entities/interfaces/UserProps'
import User from '../../entities/User'
import UserRepository from '../../repositories/UserRepository'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

export default class CreateUser {
    userRepository: UserRepository

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
    }

    async execute (userRequest: UserProps):Promise<User> {
      const userAlreadyExists = await this.userRepository.findByEmail(userRequest.email.value)

      if (userAlreadyExists) {
        throw new EmailAlreadyUsed(userRequest.email.value)
      }

      const user = await this.userRepository.createUser(userRequest)

      if (!user) {
        throw new Error('Cannot creact user')
      }

      return user
    }
}
