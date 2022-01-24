import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidRefreshToken extends Error implements DomainError {
  constructor () {
    super('Invalid Refresh Token')
    this.name = 'InvalidRefreshToken'
  }
}
