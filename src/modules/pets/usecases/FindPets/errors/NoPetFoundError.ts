import DomainError from '@domain/entities/errors/DomainError'

export default class NoPetFoundError extends Error implements DomainError {
  constructor () {
    super('No pet found')
    this.name = 'NoPetFoundError'
  }
}
