export default abstract class Entity<T>{
    public readonly id: number
    public readonly props: T

    constructor(props: T, id: number){
        this.id = id
        this.props = props
    }
}