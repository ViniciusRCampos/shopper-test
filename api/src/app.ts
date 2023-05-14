const express = require('express');
import connection from './database/config/config'

const con = connection

con.connect ((err: any) => 
    {
    if (err) {
        console.log (err)
    }
    else
    {
        console.log (`connection successful`)
        const app = express ();

        app.listen (3001,() => console.log('server listening on port 3001'));
    }
})