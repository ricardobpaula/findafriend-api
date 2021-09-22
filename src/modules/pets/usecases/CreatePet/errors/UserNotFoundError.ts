import DomainError from '@domain/entities/errors/DomainError'

export default class UserNotFoundError extends Error implements DomainError {
  constructor () {
    super('The user not found')
    this.name = 'UserNotFoundError'
  }
}
