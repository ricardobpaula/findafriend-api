import DomainError from '@domain/entities/errors/DomainError'

export default class SpecieNotFoundError extends Error implements DomainError {
  constructor (specie: string) {
    super(`The specie ${specie} not found`)
    this.name = 'SpecieNotFoundError'
  }
}
