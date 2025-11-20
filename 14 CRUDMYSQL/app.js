/*
Vamos a crear un cleinte-servidor para un sistema CRUD (Create, Read, Update, Delete) 
para esto debemos de probar si el modulo de MySQLi está verificado 
sino utilizaremos mysql
*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({ // Definido como 'db'
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'estudiantes_cecyt'
});

db.connect((error) => { // Usamos la variable 'db' para la conexión
    if (error) {

        console.error('Error de conexión a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL');
    }
});

//tenemos que configurar nuestro middleware el cual estaremos usando rutas y codificacion de la informacion por json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tenemos que configurar las vistas que se van a ejecutar
app.set('view engine', 'ejs');

//donde se encuentra el directorio de las vistas
app.set('views', __dirname, '/views');

//para la carga de imagenes, css y archivos multimedia, etc es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se van a consumir
app.use(express.static(path.join(__dirname + '/css')));

//vamos a crear el crud de estudiantes a partir de rutas

//ruta para crear un estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, apellido, edad } = req.body;
    const query = 'INSERT INTO estudiantes (nombre, apellido, edad) VALUES (?, ?, ?)';
    db.query(query, [nombre, apellido, edad], (error, results) => {
        if (error) {
            console.error('Error al crear estudiante:', error);
            res.status(500).send('Error al crear estudiante');
        }
        else {
            res.status(201).send('Estudiante creado exitosamente');
        }
    });
});

//ruta para mostrar el formulario de creacion de estudiantes
app.get('/', (req, res) => {
    //necesito obtener la lista de estudiantes desde la base de datos
    const query = 'SELECT * FROM estudiantes';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener estudiantes:', error);
            res.status(500).send('Error al obtener estudiantes');
        }   
        else {
            res.render('index', { estudiantes: results });
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});