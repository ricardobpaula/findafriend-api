import AccessToken from '@domain/infra/gateways/AccessToken'
import { Either, left, right } from '@domain/logic/Either'
import UserRepository from '../../repositories/UserRepository'
import AccessTokenError from './errors/AccessTokenError'
import EmailOrPasswordIncorrect from './errors/EmailOrPasswordIncorrect'

type AuthRequest = {
  email: string,
  password: string
}

type TokenResponse = {
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
        left(new EmailOrPasswordIncorrect())
      }

      if (!await user.props.password.compare(password)) {
        left(new EmailOrPasswordIncorrect())
      }

      const token = await this.AccessToken.getToken(user.getIdString())

      if (!token) {
        left(new AccessTokenError())
      }

      return right({ token })
    }
}
