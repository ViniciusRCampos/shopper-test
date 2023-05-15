import connection from './database/config/config'
import { App } from './app';

const con = connection

con.connect ((err: any) => 
    {
    if (err) {
        console.log (err)
        return
    }
    else
    {
        console.log (`connection successful`)
    }
})

const PORT =  3001;

new App().start(PORT);
