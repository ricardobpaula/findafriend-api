export type Decoded = {
  sub: string
}

export default interface AccessToken {
    getToken(id: string):Promise<string>
    verify(token: string):Promise<string>
    decode(token: string):Promise<Decoded>
}
