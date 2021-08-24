import Email from '../Email'
import Password from '../Password';
import Phone from '../Phone';

export default interface UserProps {
    firstName: string
    lastName: string
    phone: Phone
    email: Email
    password: Password
    role: 'admin'|'commun'
}