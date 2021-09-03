import DomainError from '@domain/entities/errors/DomainError'

export default class EmailAlreadyUsed extends Error implements DomainError{
    constructor(email: string) {
        super(`The email ${email} already used`)
        this.name = 'EmailAlreadyUsed'
    }
}