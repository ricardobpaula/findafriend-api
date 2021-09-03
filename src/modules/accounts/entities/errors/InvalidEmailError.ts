import DomainError from '@domain/entities/errors/DomainError'

export default class InvalidEmailError extends Error implements DomainError{
    constructor(email: string) {
        super(`The email ${email} is invalid`)
        this.name = 'InvalidEmailError'
    }
}