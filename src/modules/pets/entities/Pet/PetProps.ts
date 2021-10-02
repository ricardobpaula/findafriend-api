import Description from './Description'
import Size from './Size'

export default interface PetProps {
  description: Description
  ownerId: number
  specieId: number
  size: Size
  adopted: boolean
}
