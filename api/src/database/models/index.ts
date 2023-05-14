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

export default sequelize;
