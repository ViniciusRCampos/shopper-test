import Product from '../database/models/Product.Model'
import IData from './IData'
import IProducts from './IProducts'

export default interface IServiceProducts{
    readAll(): Promise<Product[]>
    updateById(products: IProducts[]): Promise<Product[] | null | any[]>
    validateCSV(products: IData[]): Promise<IProducts[]>
}