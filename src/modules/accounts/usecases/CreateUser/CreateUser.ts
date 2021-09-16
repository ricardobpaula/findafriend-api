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

      const emailOrError = Email.create(request.email)
      const passwordOrError = PasswordFactory(request.password)
      const phoneOrError = Phone.create(request.phone)
      const roleOrError = Role.create(request.role)

      if (emailOrError.isLeft()) {
        return left(emailOrError.value)
      }

      if (passwordOrError.isLeft()) {
        return left(passwordOrError.value)
      }

      if (roleOrError.isLeft()) {
        return left(roleOrError.value)
      }

      if (phoneOrError.isLeft()) {
        return left(phoneOrError.value)
      }

      const userOrError = User.create({
        firstName: request.firstName,
        lastName: request.lastName,
        avatar: request?.avatar,
        isFinding: request?.isFinding,
        phone: phoneOrError.value,
        email: emailOrError.value,
        password: passwordOrError.value,
        role: roleOrError.value
      })

      if (userOrError.isLeft()) {
        return left(userOrError.value)
      }

      const user = await this.userRepository.createUser(userOrError.value)

      return right(user)
    }
}
