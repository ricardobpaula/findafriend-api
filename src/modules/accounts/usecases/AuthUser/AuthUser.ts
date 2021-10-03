import AccessToken from '@domain/infra/gateways/AccessToken'
import { Either, left, right } from '@domain/logic/Either'
import UserRepository from '../../repositories/UserRepository'
import AccessTokenError from './errors/AccessTokenError'
import EmailOrPasswordIncorrect from './errors/EmailOrPasswordIncorrect'

export type AuthRequest = {
  email: string,
  password: string
}

type UserResponse = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    isFinding: boolean,
    avatar: string,
    role: string
}

type TokenResponse = {
  user: UserResponse,
  token: string
}

type AuthReponse = Either< EmailOrPasswordIncorrect | AccessTokenError, TokenResponse>

export default class AuthUser {
    private readonly userRepository: UserRepository
    private readonly AccessToken: AccessToken

    constructor (userRepository: UserRepository, AccessToken: AccessToken) {
      this.userRepository = userRepository
      this.AccessToken = AccessToken
    }

    async execute ({ email, password }: AuthRequest): Promise<AuthReponse> {
      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        return left(new EmailOrPasswordIncorrect())
      }

      if (!await user.props.password.compare(password)) {
        return left(new EmailOrPasswordIncorrect())
      }

      const token = await this.AccessToken.getToken(user.getIdString())

      if (!token) {
        return left(new AccessTokenError())
      }

      const userResponse = {
        firstName: user.props.firstName,
        lastName: user.props.lastName,
        email: user.props.email.value,
        phone: user.props.phone.value,
        avatar: user.props.avatar,
        isFinding: user.props.isFinding,
        role: user.props.role.value
      } as UserResponse

      return right({ user: userResponse, token })
    }
}
