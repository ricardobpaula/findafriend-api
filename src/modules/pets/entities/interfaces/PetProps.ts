import User from '@modules/accounts/entities/User'
import Specie from '../Specie'

export type PortType = 'small'|'medium'|'big'

export default interface PetProps {
    owner: User
    description: string
    specie: Specie
    port: PortType
}
