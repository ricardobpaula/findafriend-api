import TokenAccess from '@domain/infra/gateways/TokenAccess'
import UserRepository from '../../repositories/UserRepository'
import AccessTokenError from './errors/AccessTokenError'
import EmailOrPasswordIncorrect from './errors/EmailOrPasswordIncorrect'

export default class AuthUser {
    userRepository: UserRepository
    tokenAccess: TokenAccess

    constructor (userRepository: UserRepository, tokenAccess: TokenAccess) {
      this.userRepository = userRepository
      this.tokenAccess = tokenAccess
    }

    async execute (email: string, password: string): Promise<string> {
      const user = await this.userRepository.findByEmail(email)

      if (!user) {
        throw new EmailOrPasswordIncorrect()
      }

      if (!await user.props.password.compare(password)) {
        throw new EmailOrPasswordIncorrect()
      }

      const token = this.tokenAccess.getToken(user.getIdString())

      if (!token) {
        throw new AccessTokenError()
      }

      return token
    }
}
