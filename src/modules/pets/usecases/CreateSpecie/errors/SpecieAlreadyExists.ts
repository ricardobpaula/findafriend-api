import DomainError from "../../../../../domain/entities/errors/DomainError"

export default class SpecieAlreadyExists extends Error implements DomainError {
    constructor(specie: string) {
        super(`The specie ${specie} already exists`)
        this.name = 'SpecieAlreadyExists'
    }
}