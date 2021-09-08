import { User as PersistenceUser, Role as PersistenceRole } from '@prisma/client'
import Phone from '../entities/Phone'
import Email from '../entities/Email'
import User from '../entities/User'
import Role from '../entities/Role'
import UserProps from '../entities/interfaces/UserProps'
import PasswordFactory from '../factories/PasswordFactory'

export default class UserMapper {
  static toDomain (raw: PersistenceUser): User {
    const phone = Phone.create(raw.phone)
    const email = Email.create(raw.email)
    const password = PasswordFactory(raw.password, true)
    const role = Role.create(raw.role)

    const user = User.create({
      firstName: raw.first_name,
      lastName: raw.last_name,
      phone,
      email,
      password,
      isFinding: raw.is_finding,
      avatar: raw.avatar,
      role
    }, raw.id)

    return user
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
