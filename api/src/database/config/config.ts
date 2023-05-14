const mysql = require ('mysql2')

const connection = mysql.createConnection ({ 
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'shopper_db',
    connectTimeout: 60000
})

export default connection;