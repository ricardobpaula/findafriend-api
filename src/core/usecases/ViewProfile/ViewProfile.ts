import UserRepository from '@core/repositories/UserRepository'

export type ViewProfileRequest = {
  userId: string
}
type AvatarResponse = {
  id: string,
  originalName: string,
  name: string,
  path: string,
  size: number,
  date: Date
}

type UserResponse = {
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    isFinding: boolean,
    avatar?: AvatarResponse,
    role: string,
    since: Date
}

type ViewProfileResponse = UserResponse

export default class ViewProfile {
  private readonly userRepository: UserRepository
  constructor (userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async execute ({ userId }: ViewProfileRequest): Promise<ViewProfileResponse> {
    const user = await this.userRepository.findById(userId)
    console.log(user)
    const { email, firstName, lastName, phone, avatar, isFinding, role } = user.props

    return {
      id: user.id,
      email: email.value,
      firstName,
      isFinding,
      lastName,
      phone: phone.value,
      role: role.value,
      since: user.createdAt,
      avatar: {
        id: avatar?.id,
        date: avatar?.props?.date,
        name: avatar?.props?.name,
        originalName: avatar?.props?.originalName,
        path: avatar?.props?.path,
        size: avatar?.props?.size
      }
    }
  }
}
