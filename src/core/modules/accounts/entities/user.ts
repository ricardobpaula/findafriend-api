import Entity from "../../../domain/Entity"
import UserProps from "./interfaces/UserProps"

export default class User extends Entity<UserProps> {
    
    constructor(props: UserProps,id?: number){
        
        super(props,id)

    }
   
}