import DomainError from '@domain/entities/errors/DomainError'

export default class AccessDeniedError extends Error implements DomainError {
  constructor () {
    super('Access denied')
    this.name = 'AccessDeniedError'
  }
}
