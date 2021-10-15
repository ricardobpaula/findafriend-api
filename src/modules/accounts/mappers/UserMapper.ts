import { User as PersistenceUser, Role as PersistenceRole } from '@prisma/client'
import Phone from '../entities/Phone'
import Email from '../entities/Email'
import User from '../entities/User'
import Role from '../entities/Role'
import UserProps from '../entities/interfaces/UserProps'
import PasswordFactory from '../factories/PasswordFactory'

export default class UserMapper {
  static toDomain (raw: PersistenceUser): User {
    const phoneOrError = Phone.create(raw.phone)
    const emailOrError = Email.create(raw.email)
    const passwordOrError = PasswordFactory(raw.password, true)
    const roleOrError = Role.create(raw.role)

    if (emailOrError.isLeft()) {
      throw emailOrError.value
    }

    if (passwordOrError.isLeft()) {
      throw passwordOrError.value
    }

    if (roleOrError.isLeft()) {
      throw roleOrError.value
    }

    if (phoneOrError.isLeft()) {
      throw phoneOrError.value
    }

    const userOrError = User.create({
      firstName: raw.first_name,
      lastName: raw.last_name,
      phone: phoneOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      isFinding: raw.is_finding,
      avatar: raw.avatar,
      role: roleOrError.value
    },
    raw.id,
    raw.created_at,
    raw.updated_at)

    if (userOrError.isLeft()) {
      throw userOrError.value
    }
    return userOrError.value
  }

  static async toPersistence (user: UserProps) {
    return {
      email: user.email.value,
      first_name: user.firstName,
      last_name: user.lastName,
      password: await user.password.getHashed(),
      phone: user.phone.value,
      avatar: user?.avatar,
      is_finding: user?.isFinding,
      role: user?.role?.value as PersistenceRole
    }
  }
}
