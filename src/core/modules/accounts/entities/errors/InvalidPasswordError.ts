import DomainError from '../../../../domain/errors/DomainError'

export default class InvalidPasswordError extends Error implements DomainError{
    constructor(password: string) {
        super(`The password ${password} is invalid`)
        this.name = 'InvalidPasswordError'
    }
}