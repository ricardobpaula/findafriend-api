import { Either, left, right } from '@domain/logic/Either'
import BcryptAdapter from '@infra/gateways/BcryptAdapter'
import InvalidPasswordError from '../entities/errors/InvalidPasswordError'
import Password from '../entities/Password'

export default function PasswordFactory (
  passwordProps: string,
  hashed?: boolean
) :Either<InvalidPasswordError, Password> {
  const bcryptAdapter = BcryptAdapter.create()
  const passwordOrError = Password.create(passwordProps, bcryptAdapter, hashed)

  if (passwordOrError.isLeft()) {
    return left(passwordOrError.value)
  }

  return right(passwordOrError.value)
}
