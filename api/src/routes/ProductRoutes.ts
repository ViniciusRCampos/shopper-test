import { Request, Response, Router } from 'express';
import ProductService from '../services/ProductService';
import ProductController from '../controller/ProductController';

const productRoute = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

productRoute.get('/products', (req: Request, res: Response) => {
    productController.readAll(req,res)
})

export default productRoute