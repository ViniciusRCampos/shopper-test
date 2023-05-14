import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product.Model';
import IServiceProduct from '../Interfaces/IServiceProducts';

export default class ProductService implements IServiceProduct{
    protected model: ModelStatic<Product> = Product;
    async readAll(): Promise<Product[]> {
        const result = await this.model.findAll()
        return result
    }
    readProductById(code: number): Promise<Product | null> {
        throw new Error('Method not implemented.');
    }
    updateById(code: number): Promise<Product | null> {
        throw new Error('Method not implemented.');
    }
}