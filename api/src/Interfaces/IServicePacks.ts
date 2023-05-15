import Pack from '../database/models/Pack.Model'

export default interface IServicePack{
    findByProductId(productId: number): Promise<Pack | null>
    findByPackId(packId: number): Promise<Pack[] | null>
}