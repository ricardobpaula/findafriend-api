import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidNameError extends Error implements DomainError {
  constructor (name: string) {
    super(`The specie name ${name} is invalid`)
    this.name = 'InvalidNameError'
  }
}
