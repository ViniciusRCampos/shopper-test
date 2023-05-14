const express = require('express');
import connection from './database/config/config'
import productRoute from './routes/ProductRoutes'

const con = connection

con.connect ((err: any) => 
    {
    if (err) {
        console.log (err)
    }
    else
    {
        console.log (`connection successful`)
        const app = express();

        app.use(productRoute)
        app.listen (3001,() => console.log('server listening on port 3001'));
    }
})