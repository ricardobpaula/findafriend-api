import TokenAccess from '@domain/infra/gateways/TokenAccess'
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
    userRepository: UserRepository
    tokenAccess: TokenAccess

    constructor (userRepository: UserRepository, tokenAccess: TokenAccess) {
      this.userRepository = userRepository
      this.tokenAccess = tokenAccess
    }

    async execute ({ email, password }: AuthRequest): Promise<AuthReponse> {
      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        left(new EmailOrPasswordIncorrect())
      }

      if (!await user.props.password.compare(password)) {
        left(new EmailOrPasswordIncorrect())
      }

      const token = await this.tokenAccess.getToken(user.getIdString())

      if (!token) {
        left(new AccessTokenError())
      }

      return right({ token })
    }
}
