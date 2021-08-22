import Email from "../email";

export default interface UserProps {
    firstName: string
    lastName: string
    phone: string
    email: Email
    password: string
    role: 'admin'|'commun'
}