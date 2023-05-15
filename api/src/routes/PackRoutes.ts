import { Request, Response, Router } from 'express';
import PackService from '../services/PackService';
import PackController from '../controller/PackController';

const packRoute = Router();
const packService = new PackService();
const packController = new PackController(packService);

// packRoute.get('/Packs', (req: Request, res: Response) => {
//     PackController.readAll(req,res)
// })

packRoute.post('/Packs', (req: Request, res: Response) => {
    packController.validateData(req,res)
})

export default packRoute