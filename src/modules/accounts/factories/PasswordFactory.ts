import BcryptAdapter from '@infra/gateways/BcryptAdapter'
import Password from '../entities/Password'

export default function PasswordFactory (passwordProps: string, hashed?: boolean) :Password {
  const bcryptAdapter = BcryptAdapter.create()
  const password = Password.create(passwordProps, bcryptAdapter, hashed)

  return password
}
