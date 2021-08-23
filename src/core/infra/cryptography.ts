export default interface Cryptography {
    getHashed(text: string): Promise<string>
    compare(textToCompare: string, textHashed: string)
}