import DomainError from "@domain/entities/errors/DomainError"

export default class EmailOrPasswordIncorrect extends Error implements DomainError{
    constructor() {
        super('Email or password is incorrect')
        this.name = 'EmailOrPasswordIncorrect'
    }
}