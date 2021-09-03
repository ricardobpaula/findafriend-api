import Entity from "@domain/entities/Entity"
import SpecieProps from "./interfaces/SpecieProps"

export default class Specie extends Entity<SpecieProps> {
    constructor(props: SpecieProps, id?: number){
        super(props,id)
    }
}