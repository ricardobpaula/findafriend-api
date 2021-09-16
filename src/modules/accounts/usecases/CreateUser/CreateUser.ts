import { Either, left, right } from '@domain/logic/Either'
import Email from '@modules/accounts/entities/Email'
import InvalidEmailError from '@modules/accounts/entities/errors/InvalidEmailError'
import InvalidPasswordError from '@modules/accounts/entities/errors/InvalidPasswordError'
import InvalidPhoneError from '@modules/accounts/entities/errors/InvalidPhoneError'
import InvalidRoleError from '@modules/accounts/entities/errors/InvalidRoleError'
import Phone from '@modules/accounts/entities/Phone'
import Role from '@modules/accounts/entities/Role'
import PasswordFactory from '@modules/accounts/factories/PasswordFactory'
import User from '../../entities/User'
import UserRepository from '../../repositories/UserRepository'
import EmailAlreadyUsed from './errors/EmailAlreadyUsed'

export type UserRequest = {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  isFinding?: boolean
  avatar?: string
  role?: string
}

type UserResponse = Either<
  | InvalidEmailError
  | InvalidPasswordError
  | InvalidPhoneError
  | InvalidRoleError
  | EmailAlreadyUsed,
  User
>

export default class CreateUser {
    userRepository: UserRepository

    constructor (userRepository: UserRepository) {
      this.userRepository = userRepository
    }

    async execute (request: UserRequest):Promise<UserResponse> {
      const userAlreadyExists = await this.userRepository.findByEmail(request.email)

      if (userAlreadyExists) {
        return left(new EmailAlreadyUsed(request.email))
      }

      const email = Email.create(request.email)
      const password = PasswordFactory(request.password)
      const phone = Phone.create(request.phone)
      const role = Role.create(request.role)
      // TODO Validations to creates methods
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

      return right(user)
    }
}
