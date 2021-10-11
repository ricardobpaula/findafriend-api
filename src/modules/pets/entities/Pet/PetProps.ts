import Specie from '../Specie/Specie'
import Description from './Description'
import Size from './Size'

export default interface PetProps {
  description: Description
  ownerId: number
  specie: Specie
  size: Size
  adopted: boolean
}
