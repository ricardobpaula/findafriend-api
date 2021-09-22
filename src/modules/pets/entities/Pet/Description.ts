import { Either, left, right } from '@domain/logic/Either'
import InvalidDescriptionError from './errors/InvalidDescriptionError'

export default class Description {
  private readonly description: string

  private constructor (description: string) {
    this.description = description
  }

  get value (): string {
    return this.description
  }

  private static validate (description: string): boolean {
    return description.length >= 10 && description.length < 256
  }

  static create (description: string): Either<InvalidDescriptionError, Description> {
    if (!this.validate(description.trimRight())) {
      return left(new InvalidDescriptionError(description))
    }

    return right(new Description(description.trimRight()))
  }
}
