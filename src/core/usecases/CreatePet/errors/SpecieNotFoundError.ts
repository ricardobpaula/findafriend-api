import DomainError from '@domain/entities/errors/DomainError'

export default class SpecieNotFoundError extends Error implements DomainError {
  constructor () {
    super('The specie not found')
    this.name = 'SpecieNotFoundError'
  }
}
