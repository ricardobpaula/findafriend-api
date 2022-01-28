import RefreshTokenRepository from '@core/repositories/RefreshTokenRepository'
import { Either, left, right } from '@domain/logic/Either'
import AccessToken from '@domain/infra/gateways/AccessToken'
import InvalidRefreshToken from './errors/InvalidRefreshToken'

type RefreshTokenRequest = {
    token: string
}

type RefreshTokenResponse = {
    token: string,
    refreshToken: {
      id: string,
      expiresIn: Date
    }
}

type Response = Either<InvalidRefreshToken, RefreshTokenResponse>

export default class RefreshToken {
  private readonly refreshTokenRepository: RefreshTokenRepository
  private readonly accessToken: AccessToken

  constructor (
    refreshTokenRepository: RefreshTokenRepository,
    accessToken: AccessToken
  ) {
    this.refreshTokenRepository = refreshTokenRepository
    this.accessToken = accessToken
  }

  async execute ({ token }: RefreshTokenRequest): Promise<Response> {
    const refreshToken = await this.refreshTokenRepository.findById(token)
    if (!refreshToken || refreshToken.props.expiresIn < new Date()) {
      return left(new InvalidRefreshToken())
    }
    const newToken = await this.accessToken.getToken(refreshToken.props.user.getIdString())

    await this.refreshTokenRepository.delete(refreshToken)

    const newRefreshToken = await this.refreshTokenRepository.create(refreshToken.props.user)

    return right({
      refreshToken: {
        id: newRefreshToken.id,
        expiresIn: newRefreshToken.props.expiresIn
      },
      token: newToken
    })
  }
}
