import { User as PersistenceUser, Role as PersistenceRole, Photo as PersistencePhoto } from '@prisma/client'
import Phone from '../entities/User/Phone'
import Email from '../entities/User/Email'
import User from '../entities/User/User'
import Role from '../entities/User/Role'
import UserProps from '../entities/User/UserProps'
import PasswordFactory from '../factories/PasswordFactory'
import Photo from '@core/entities/Photo/Photo'

type PersistenceProps = {
  user: PersistenceUser,
  photo?: PersistencePhoto
}

export default class UserMapper {
  static toDomain (raw: PersistenceProps): User {
    const phoneOrError = Phone.create(raw.user.phone)
    const emailOrError = Email.create(raw.user.email)
    const passwordOrError = PasswordFactory(raw.user.password, true)
    const roleOrError = Role.create(raw.user.role)
    const avatar = (
      !raw.photo
        ? undefined
        : Photo.create({
          date: raw.photo?.date,
          name: raw.photo?.name,
          originalName: raw.photo?.original_name,
          path: raw.photo?.path,
          size: Number(raw.photo?.size)
        }, raw.photo?.id, raw.photo?.created_at, raw.photo?.updated_at)
    )

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
      firstName: raw.user.first_name,
      lastName: raw.user.last_name,
      phone: phoneOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
      isFinding: raw.user.is_finding,
      avatar: avatar || undefined,
      role: roleOrError.value
    },
    raw.user.id,
    raw.user.created_at,
    raw.user.updated_at)

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
