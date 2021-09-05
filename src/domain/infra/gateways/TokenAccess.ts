export default interface TokenAccess {
    getToken(id: string):Promise<string>
    verify(token: string):Promise<string>
}
