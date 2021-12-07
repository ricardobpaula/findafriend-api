import Avatar from '../Avatar/Avatar'
import Email from './Email'
import Password from './Password'
import Phone from './Phone'
import Role from './Role'

export default interface UserProps {
    firstName: string
    lastName: string
    phone: Phone
    email: Email
    password: Password
    isFinding?: boolean
    avatar?: Avatar
    role?: Role
}
