export default interface UserProps {
    id?: number
    firstName: string
    lastName: string
    phone: string
    email: string
    password: string
    role: 'admin'|'commun'
}