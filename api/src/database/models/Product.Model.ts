import { Model, INTEGER, STRING, DECIMAL } from 'sequelize';
import db from '.';

class Product extends Model {
    declare code: number;
    declare name: string;
    declare costPrice: number;
    declare salesPrice: number;
}

Product.init({
    code: {
        primaryKey: true,
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
    name: {
        type: STRING,
        allowNull: false,
      },
    costPrice: {
        type: DECIMAL(10,2),
        allowNull: false,
    },
    salesPrice: {
        type: DECIMAL(10,2),
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: db,
    modelName: 'products',
    timestamps: false,
});

export default Product;
