import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product.Model';
import IServiceProduct from '../Interfaces/IServiceProducts';
import { isPackComplete, packValidation, validations } from '../utils/validations';
import IProducts from '../Interfaces/IProducts';
import IData from '../Interfaces/IData';

export default class ProductService implements IServiceProduct{
    protected model: ModelStatic<Product> = Product;
    async readAll(): Promise<Product[]> {
        const result = await this.model.findAll()
        return result
    }
    readProductById(code: number): Promise<IProducts | null>{
        throw new Error('Method not implemented.');
    }
    updateById(code: number): Promise<Product | null> {
        throw new Error('Method not implemented.');
    }

    async findProduct(code: number): Promise<Product | null> {
        const result = await this.model.findOne({ where: { code } });
        return result ? result.dataValues : null;
      }
      
      async validateCSV(products: IData[]): Promise<IProducts[]> {
        const result: IProducts[] = [];
        let error = '';
      
        for (const product of products) {
          const data = await this.findProduct(product.product_code);
      
          if (data) {
            const pack = await packValidation(data);
      
            if (pack && pack.length > 0) {
              const isPack = isPackComplete(products, pack);
      
              if (!isPack) {
                error = 'O conjunto do produto não está na lista';
                result.push({ ...data, newPrice: product.new_price, error });
                break;
              }
            }
      
            const validate = validations(data, product.new_price);
      
            if (validate) {
              result.push(validate);
            } else {
              result.push({ ...data, newPrice: product.new_price });
            }
          }
        }
      
        return result;
      }
      
}
  
