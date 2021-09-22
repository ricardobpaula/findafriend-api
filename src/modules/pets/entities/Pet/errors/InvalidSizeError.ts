import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidSizeError extends Error implements DomainError {
  constructor (size: string) {
    super(`The animal size ${size} is invalid`)
    this.name = 'InvalidSizeError'
  }
}
