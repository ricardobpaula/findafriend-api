import AccessToken from '@domain/infra/gateways/AccessToken'
import { Either, left, right } from '@domain/logic/Either'
import UserRepository from '../../repositories/UserRepository'
import AccessTokenError from './errors/AccessTokenError'
import EmailOrPasswordIncorrect from './errors/EmailOrPasswordIncorrect'

export type AuthRequest = {
  email: string,
  password: string
}

type Avatar = {
  name: string,
  path: string,
  size: number,
  date: Date
}

type UserResponse = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    isFinding: boolean,
    avatar: Avatar,
    role: string,
    since: Date
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
        isFinding: user.props.isFinding,
        role: user.props.role.value,
        since: user.createdAt,
        avatar: {
          id: user.props.avatar.id,
          name: user.props.avatar.props.name,
          date: user.props.avatar.props.date,
          path: user.props.avatar.props.path,
          size: user.props.avatar.props.size
        }
      } as UserResponse

      return right({ user: userResponse, token })
    }
}
