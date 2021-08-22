import DomainError from '../../../../domain/errors/DomainError'

export default class InvalidPhoneError extends Error implements DomainError{
    constructor(phone: string) {
        super(`The phone ${phone} is invalid`)
        this.name = 'InvalidPhoneError'
    }
}