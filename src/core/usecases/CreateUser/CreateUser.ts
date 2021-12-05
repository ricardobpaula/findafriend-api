import { Either, left, right } from '@domain/logic/Either'
import Email from '@core/entities/User/Email'
import InvalidEmailError from '@core/entities/User/errors/InvalidEmailError'
import InvalidPasswordError from '@core/entities/User/errors/InvalidPasswordError'
import InvalidPhoneError from '@core/entities/User/errors/InvalidPhoneError'
import InvalidRoleError from '@core/entities/User/errors/InvalidRoleError'
import Phone from '@core/entities/User/Phone'
import Role from '@core/entities/User/Role'
import PasswordFactory from '@core/factories/PasswordFactory'
import User from '../../entities/User/User'
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
    private readonly userRepository: UserRepository

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
