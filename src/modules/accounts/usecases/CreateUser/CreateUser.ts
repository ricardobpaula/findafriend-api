import Email from '@modules/accounts/entities/Email'
import Phone from '@modules/accounts/entities/Phone'
import Role from '@modules/accounts/entities/Role'
import PasswordFactory from '@modules/accounts/factories/PasswordFactory'
import User from '../../entities/User'
import UserRepository from '../../repositories/UserRepository'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

export interface UserRequest {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  isFinding?: boolean
  avatar?: string
  role?: string
}

export default class CreateUser {
    userRepository: UserRepository

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
    }

    async execute (request: UserRequest):Promise<User> {
      const userAlreadyExists = await this.userRepository.findByEmail(request.email)

      if (userAlreadyExists) {
        throw new EmailAlreadyUsed(request.email)
      }

      const email = Email.create(request.email)
      const password = PasswordFactory(request.password)
      const phone = Phone.create(request.phone)
      const role = Role.create(request.role)
      const userRequest = User.create({
        firstName: request.firstName,
        lastName: request.lastName,
        avatar: request?.avatar,
        isFinding: request?.isFinding,
        phone,
        email,
        password,
        role
      })

      const user = await this.userRepository.createUser(userRequest)

      if (!user) {
        throw new Error('Cannot creact user')
      }

      return user
    }
}
