import IData from "../Interfaces/IData";
import IProducts from "../Interfaces/IProducts"
import PackService from "../services/PackService";


function priceValidation(result: IProducts, new_price: number): IProducts | null {
    result.newPrice = new_price
    if (result.costPrice >= new_price || result.costPrice === new_price) {
        result.error = 'O preço é menor do que o custo'
        return result
    }
    return null
}

function adjustmentValidation(result: IProducts, new_price: number): IProducts | null {
    const percent = ((new_price / result.salesPrice) -1) *100
    result.newPrice = new_price
    if ( percent > 10 ){
        result.error = 'O novo valor possui um aumento maior que 10% do valor atual'
        return result
    }
    if ( percent < -10 ){
        result.error = 'O novo valor possui um desconto maior que 10% do valor atual'
        return result
    }
    return null
}

export async function packValidation(result: IProducts): Promise<number[]> {
   const pack = new PackService();
   const isPack = await pack.findByPackId(result.code)
   const isProductOfPack = await pack.findByProductId(result.code)
   if (isPack && isPack?.length > 0){
        const data: number[] = []
        isPack.map((element) => {
            data.push(element.productId)
        })
        return data
   }
   if (isProductOfPack){
    const data: number[] = [isProductOfPack.dataValues.packId]
    console.log(data, 'isproductofpack')
    return data
   }
   return []
}

export function isPackComplete(
    products: IData[],
    pack: number[]): boolean {
    return pack.every((id) => products.find(
        (product) => product.product_code === id));
  }

export function validations(result: IProducts, new_price: number): IProducts | null{
    const adjustment = adjustmentValidation(result, new_price)
    if(!adjustment){
        const price = priceValidation (result, new_price)
        if(!price){
            result.newPrice = new_price
            return null
        }
        return price
    }
    return adjustment
        }

export async function rulesValidations(result: IProducts, new_price: number, products: IData[]): Promise<IProducts>{
    let error = ''
    const pack = await packValidation(result);
    if (pack && pack.length > 0) {
      const isPack = isPackComplete(products, pack);
      if (!isPack) {
        error = 'O conjunto do produto não está na lista';
        const data = ({ ...result, newPrice: new_price, error });
        return data
      }
    }
    const validate = validations(result, new_price);
    if (validate) {
        const data =(validate);
        return data
    } else {
        const data = ({ ...result, newPrice: new_price });
        return data
    }
}