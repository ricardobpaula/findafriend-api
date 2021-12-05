import DomainError from '@domain/entities/errors/DomainError'

export default class AccessTokenError extends Error implements DomainError {
  constructor () {
    super('Access Token Error')
    this.name = 'AccessTokenError'
  }
}
