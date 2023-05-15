import { Request, Response } from 'express';
import IServicePacks from '../Interfaces/IServicePacks';

export default class PackController {
    private _service: IServicePacks;

    constructor(service: IServicePacks){
        this._service = service;
    }

    // async readAll(_req: Request, res: Response){
    //     const result = await this._service.readAll();
    //     res.status(200).json(result);
    // }

    async validateData(req: Request, res: Response){
        const {code, new_price } = req.body
        const result = await this._service.findByPackId(code)
        res.status(201).json(result)
    }
}