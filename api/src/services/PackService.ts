import { ModelStatic } from 'sequelize';
import Pack from '../database/models/Pack.Model';
import IServicePack from '../Interfaces/IServicePacks';

export default class PackService implements IServicePack{
    protected model: ModelStatic<Pack> = Pack;
    async findByProductId(productId: number): Promise<Pack | null> {
        const result = await this.model.findOne({where: {productId}})
        return result
    
    }
    async findByPackId(packId: number): Promise<Pack[] | null> {
        const result = await this.model.findAll({where: {packId}})
        return result
    
    }
}
