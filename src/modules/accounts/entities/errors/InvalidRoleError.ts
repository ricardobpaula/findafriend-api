import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidRoleError extends Error implements DomainError {
  constructor (role: string) {
    super(`The role ${role} is invalid`)
    this.name = 'InvalidRoleError'
  }
}
