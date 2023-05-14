import { Model, INTEGER } from 'sequelize';
import db from '.';

class Pack extends Model {
    declare id: number;
    declare packId: number;
    declare productId: number;
    declare qty: number
}

Pack.init(
    {
        id: {
          type: INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        packId: {
          type: INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'code',
          },
        },
        productId: {
          type: INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'code',
          },
        },
        qty: {
          type: INTEGER,
          allowNull: false,
        },
      },
      {
        underscored: true,
        sequelize: db,
        modelName: 'packs',
        timestamps: false,
      }
    );