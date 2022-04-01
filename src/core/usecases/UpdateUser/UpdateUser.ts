import Email from '@core/entities/User/Email'
import InvalidEmailError from '@core/entities/User/errors/InvalidEmailError'
import InvalidPhoneError from '@core/entities/User/errors/InvalidPhoneError'
import Phone from '@core/entities/User/Phone'
import User from '@core/entities/User/User'
import UserRepository from '@core/repositories/UserRepository'
import { Either, left, right } from '@domain/logic/Either'
import EmailAlreadyUsed from '../CreateUser/errors/EmailAlreadyUsed'

export type UserRequest = {
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
}

type UserResponse = Either<
  | InvalidEmailError
  | InvalidPhoneError
  | EmailAlreadyUsed,
  User
>

export default class UpdateUser {
  private readonly userRepository:UserRepository

  constructor (userRepository:UserRepository) {
    this.userRepository = userRepository
  }

  async execute ({ firstName, lastName, email, phone, userId }: UserRequest):Promise<UserResponse> {
    const userAlreadyExists = await this.userRepository.findByEmail(email || '')
    const user = await this.userRepository.findById(userId)

    if (userAlreadyExists && email !== user.props.email.value) {
      return left(new EmailAlreadyUsed(email))
    }

    const emailOrError = Email.create(email || user.props.email.value)
    const phoneOrError = Phone.create(phone || user.props.phone.value)

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (phoneOrError.isLeft()) {
      return left(phoneOrError.value)
    }
    const userPersistence = User.create({
      firstName: firstName || user.props.firstName,
      lastName: lastName || user.props.lastName,
      email: emailOrError.value,
      phone: phoneOrError.value
    }, userId)

    if (userPersistence.isLeft()) {
      return left(userPersistence.value)
    }

    const userOrError = await this.userRepository.updateUser(userPersistence.value)

    return right(userOrError)
  }
}
