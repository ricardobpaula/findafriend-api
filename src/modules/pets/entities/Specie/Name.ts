import { Either, left, right } from '@domain/logic/Either'

export default class Name {
  private readonly name: string

  private constructor (name: string) {
    this.name = name
  }

  get value ():string {
    return this.name
  }

  private static validate (name: string): boolean {
    return name.length > 2 && name.length <= 25
  }

  static create (name: string): Either< Error, Name> {
    if (!this.validate(name.trim())) {
      return left(new Error('Error'))
    }
    return right(new Name(name.trim().toLowerCase()))
  }
}
