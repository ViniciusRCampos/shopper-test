import { Request, Response } from 'express';
import IServiceProducts from '../Interfaces/IServiceProducts';

export default class ProductController {
    private _service: IServiceProducts;

    constructor(service: IServiceProducts){
        this._service = service;
    }

    async readAll(_req: Request, res: Response){
        const result = await this._service.readAll();
        res.status(200).json(result);
    }
}