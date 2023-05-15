import { ModelStatic } from 'sequelize';
import Product from '../database/models/Product.Model';
import IServiceProduct from '../Interfaces/IServiceProducts';
import { isPackComplete, packValidation, rulesValidations, validations } from '../utils/validations';
import IProducts from '../Interfaces/IProducts';
import IData from '../Interfaces/IData';

export default class ProductService implements IServiceProduct{
    protected model: ModelStatic<Product> = Product;
    async readAll(): Promise<Product[]> {
        const result = await this.model.findAll()
        return result
    }

    async updateById(products: IProducts[]): Promise<Product[] | null | any[]> {
        products.map(async (product) => {
          await this.model.update({salesPrice: product.newPrice}, {where:{code: product.code}})
        })
        return null
    }

    async findProduct(code: number): Promise<Product | null> {
        const result = await this.model.findOne({ where: { code } });
        return result ? result.dataValues : null;
      }
      
      async validateCSV(products: IData[]): Promise<IProducts[]> {
        const result: IProducts[] = [];
        for (const product of products) {
          const data = await this.findProduct(product.product_code);
          if(data === null){
            result.push({code: product.product_code, name: '',
              costPrice: 0, salesPrice: 0, newPrice: product.new_price,
              error: 'Produto não encontrado!'})
          }
          if (data) {
            const validation = await rulesValidations(data, product.new_price, products)
            result.push(validation)
          }
        }
      
        return result;
      }
      
}
  
