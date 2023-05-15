import { Request, Response, Router } from 'express';
import ProductService from '../services/ProductService';
import ProductController from '../controller/ProductController';
import multer from 'multer'
import readCSVFile, { deleteFile, validateCSVFile } from '../middleware/CSVReader';

const productRoute = Router();
const productService = new ProductService();
const productController = new ProductController(productService);
const upload = multer({ dest: 'uploads/' })
import * as fs from 'fs';

productRoute.get('/products',  (req: Request, res: Response) => {
    productController.readAll(req,res)
})

productRoute.post('/products', upload.single('file'),async (req: Request, res: Response) => {
    const file = req.file
    if(file){
        if (file.mimetype !== 'text/csv') {
            return res.status(400).json({ error: 'O arquivo enviado não é um CSV válido.' });
          }
          try {
            const isValidCSV = await validateCSVFile(file.path);
            if (!isValidCSV) {
              await deleteFile(file.path)
              return res.status(400).json({ error: 'O arquivo CSV não está no formato esperado.' });
            }
            req.body = await readCSVFile(file.path);
        } catch (error) {
        console.error(error);
        await deleteFile(file.path)
        res.status(500).json({ error: 'Ocorreu um erro ao processar o arquivo CSV.' });
    }
    await deleteFile(file.path)
  }
    productController.validateData(req,res)
})

export default productRoute