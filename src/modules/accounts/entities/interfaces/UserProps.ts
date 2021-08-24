import Email from '../email'
import Password from '../password';
import Phone from '../phone';

export default interface UserProps {
    firstName: string
    lastName: string
    phone: Phone
    email: Email
    password: Password
    role: 'admin'|'commun'
}