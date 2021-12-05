import { Either, left, right } from '@domain/logic/Either'
import InvalidSizeError from './errors/InvalidSizeError'

enum ValidSize {
  'undefined' = 'undefined',
  'small' = 'small',
  'medium' = 'medium',
  'big' = 'big'
}

export default class Size {
    private readonly size: ValidSize

    private constructor (size: ValidSize) {
      this.size = size
    }

    get value (): string {
      return this.size
    }

    static validateSizeType (size: string) {
      return (Object.values(ValidSize).includes(size as ValidSize))
    }

    static create (sizeProps: string = ValidSize.undefined): Either<InvalidSizeError, Size> {
      if (!this.validateSizeType(sizeProps)) {
        return left(new InvalidSizeError(sizeProps))
      }

      const role = new Size(sizeProps as ValidSize)

      return right(role)
    }
}
