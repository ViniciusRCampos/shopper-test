import { Sequelize } from 'sequelize';
import { Options } from 'sequelize';

const config: Options = {
  username: 'root',
  password: '123456',
  database: 'shopper_db',
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

const sequelize = new Sequelize(config)

// async function showAllSchemas() {
//     const schemas = await sequelize.showAllSchemas({});
//     console.log(schemas);
//     const data = await sequelize.getQueryInterface().showAllTables()
//     console.log(data)
//     const teste = await sequelize.query('Select * from packs', { type: QueryTypes.SELECT })
//     console.log(teste)
//   }

//   showAllSchemas()

export default sequelize;
