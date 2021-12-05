import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidDescriptionError extends Error implements DomainError {
  constructor (description: string) {
    super(`The description ${description} is invalid`)
    this.name = 'InvalidDescriptionError'
  }
}
