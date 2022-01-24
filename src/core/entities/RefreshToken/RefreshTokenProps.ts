import User from '../User/User'

export default interface RefreshTokenProps {
    user: User,
    expiresIn: Date
}
