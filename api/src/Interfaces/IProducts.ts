export default interface IProducts {
    code: number,
    name: string,
    costPrice: number,
    salesPrice: number,
    newPrice?: number,
    error?: string
}