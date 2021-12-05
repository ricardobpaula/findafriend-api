import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidPasswordError extends Error implements DomainError {
  constructor () {
    super('The password is invalid')
    this.name = 'InvalidPasswordError'
  }
}
