export default abstract class Entity<T> {
    public readonly id: string
    public readonly createdAt: Date
    public readonly updatedAt: Date
    public readonly props: T

    constructor (
      props: T,
      id: string,
      createdAt: Date,
      updatedAt: Date) {
      this.id = id
      this.props = props
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }

    getIdString (): string {
      return this.id.toString()
    }
}
