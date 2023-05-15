import Product from '../database/models/Product.Model'
import IData from './IData'
import IProducts from './IProducts'

export default interface IServiceProducts{
    readAll(): Promise<Product[]>
    readProductById(code: number): Promise<IProducts | null>
    updateById(code:number): Promise<Product | null>
    validateCSV(products: IData[]): Promise<IProducts[]>
}