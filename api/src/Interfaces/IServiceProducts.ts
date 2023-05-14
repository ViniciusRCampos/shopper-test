import Product from '../database/models/Product.Model'

export default interface IServiceProducts{
    readAll(): Promise<Product[]>
    readProductById(code: number): Promise<Product | null>
    updateById(code:number): Promise<Product | null>
}