import mysql from 'mysql2';
import dotenv from 'dotenv';

//si vamos a tener una bd en servidor
//import {fileUTLtoPath} from 'url';
//consyt __filename = fileUTLtoPath(import.meta.url);
//const __dirname = path.dirname(__filename);
//dotenv.config({path: path.resolve(__dirname, '../.env')});

dotenv.config();

const config = mysql.createPool(
{
    host: process.env.DB_HOST || 'localhost',
    user:'root',
    password: process.env.DB_PASSWORD || 'n0m3l0',
    database: process.env.DB_NAME || 'curso',
    port: process.env.DB_PORT || 3306

    //connectipnLimit: 10,
    //acquireTimeout: 30000,
    //idleTimeout: 30000

});

config.getConnection((err) =>{
    if(err){
        console.log('Error de conexion a la base de datos');
        return;
    }
    console.log('Conexion exitosa a la base de datos');
    connection.release();
});

export default config;
