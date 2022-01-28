import RefreshTokenRepository from '@core/repositories/RefreshTokenRepository'
import AccessToken from '@domain/infra/gateways/AccessToken'
import { Either, left, right } from '@domain/logic/Either'
import UserRepository from '../../repositories/UserRepository'
import AccessTokenError from './errors/AccessTokenError'
import EmailOrPasswordIncorrect from './errors/EmailOrPasswordIncorrect'

export type AuthRequest = {
  email: string,
  password: string
}

type AvatarResponse = {
  id: string,
  originalName: string,
  name: string,
  path: string,
  size: number,
  date: Date
}

type UserResponse = {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    isFinding: boolean,
    avatar?: AvatarResponse,
    role: string,
    since: Date
}

type TokenResponse = {
  user: UserResponse,
  refreshToken: {
    id: string,
    expiresIn: Date
  }
}

export type AuthReponse = Either< EmailOrPasswordIncorrect | AccessTokenError, TokenResponse>

export default class AuthUser {
    private readonly userRepository: UserRepository
    private readonly refreshTokenRepository: RefreshTokenRepository
    private readonly AccessToken: AccessToken

    constructor (
      userRepository: UserRepository,
      refreshTokenRepository: RefreshTokenRepository,
      AccessToken: AccessToken) {
      this.userRepository = userRepository
      this.refreshTokenRepository = refreshTokenRepository
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

      const alreadyRefreshToken = await this.refreshTokenRepository.find(user)

      if (alreadyRefreshToken) {
        await this.refreshTokenRepository.delete(alreadyRefreshToken)
      }

      const refreshToken = await this.refreshTokenRepository.create(user)

      const userResponse = {
        id: user.id,
        firstName: user.props.firstName,
        lastName: user.props.lastName,
        email: user.props.email.value,
        phone: user.props.phone.value,
        isFinding: user.props.isFinding,
        role: user.props.role.value,
        since: user.createdAt,
        avatar: {
          id: user.props?.avatar?.id,
          name: user.props?.avatar?.props?.name,
          originalName: user.props?.avatar?.props?.originalName,
          date: user.props?.avatar?.props?.date,
          path: user.props?.avatar?.props?.path,
          size: user.props?.avatar?.props?.size
        }
      } as UserResponse

      return right({
        user: userResponse,
        token,
        refreshToken: {
          id: refreshToken.id,
          expiresIn: refreshToken.props.expiresIn
        }
      })
    }
}
