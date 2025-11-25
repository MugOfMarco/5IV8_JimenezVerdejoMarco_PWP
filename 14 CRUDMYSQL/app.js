/*
Vamos a crear un cliente servidor para un crud
Para esto tenemos que probar si el modulo de mysql esta verificado
sino utilizaremos mysql2
*/

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');

require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;

//configuracion de mysql
const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexion a la base de datos: ' + error);
    } else {
        console.log('Conexion exitosa a la base de datos');
    }
});

//tenemos que configurar nuestro middleware, el cual estaremos usando rutas y codificacion de la informacion por json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//tenemos que configurar las vistas que se van ejecutar
app.set('view engine', 'ejs');
//donde se encuentra el directorio de dichas vistas
app.set('views', __dirname + '/views');

//para la carga de imagenes, css, multimedia, etc es necesario configurar una carpeta public, en la cual todos los recursos del proyecto se podran consumir
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/js'));

//vamos a crear el crud de estudiantes a partir de rutas
//----------------------------------------------------------------------

//----------------------------------------------------------------------

//ruta get para mostrar el formulario y la lista de estudiantes
app.get('/', (req, res) => {
    const query = 'SELECT * FROM bitacora_lubricacion ORDER BY fecha DESC';
    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener la bitácora: ' + error);
            res.status(500).send('Error al obtener la bitácora');
            return;
        }
        res.render('index', { bitacora: resultados });
    });
});


//ruta para crear un estudiante
app.post('/bitacora', (req, res) => {
    console.log('Datos recibidos del formulario:', req.body);
    const {
        equipo,
        tipo_lubricante,
        fecha,
        cantidad_utilizada,
        analisis,
        resultados_analisis,
        fecha_proxima
    } = req.body;

    const query = `INSERT INTO bitacora_lubricacion 
    (equipo, tipo_lubricante, fecha, cantidad_utilizada, 
    analisis, resultados_analisis, fecha_proxima) 
    VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        equipo, 
        tipo_lubricante, 
        fecha, 
        parseFloat(cantidad_utilizada), 
        parseInt(analisis), 
        resultados_analisis || null, 
        fecha_proxima || null 
    ];

    bd.query(query, values, (error, resultados) => { 
        if (error) {
            console.log('Error al agregar la entrada a la bitácora: ' + error);
            res.status(500).send('Error al agregar la entrada a la bitácora');
            return;
        }

        res.redirect('/');
    });

});


//Ruta para borrar
app.get('/bitacora/delete/:id', (req, res) => {
    const registroId = req.params.id;
    const query = 'DELETE FROM bitacora_lubricacion WHERE id = ?;';
    bd.query(query, [registroId], (error, resultados) => {
        if (error) {
            console.log('Error al eliminar el registro: ' + error);
            res.status(500).send('Error al eliminar el registro');
            return;
        }
        res.redirect('/');
    });
});


//Ruta para buscar y editar
app.get('/bitacora/edit/:id', (req, res) => {
    const registroId = req.params.id;
    const query = 'SELECT * FROM bitacora_lubricacion WHERE id = ?';
    bd.query(query, [registroId], (error, resultados) => {
        if (error) {
            console.log('Error al obtener el registro para edición: ' + error);
            return res.status(500).send('Error al obtener el registro para edición');
        }
        
        if (resultados.length === 0) {
            return res.status(404).send('Registro no encontrado');
        }
        
        const registro = resultados[0];
        return res.render('edit', { registro: registro });
    });
});

app.post('/bitacora/update/:id', (req, res) => {
    const registroId = req.params.id;
    const { 
        equipo, 
        tipo_lubricante, 
        fecha, 
        cantidad_utilizada, 
        analisis, 
        resultados_analisis, 
        fecha_proxima 
    } = req.body;

    const query = `
        UPDATE bitacora_lubricacion 
        SET equipo = ?, tipo_lubricante = ?, fecha = ?, cantidad_utilizada = ?, 
            analisis = ?, resultados_analisis = ?, fecha_proxima = ? 
        WHERE id = ?;   `;

    const values = [
        equipo, 
        tipo_lubricante, 
        fecha, 
        parseFloat(cantidad_utilizada), 
        parseInt(analisis), 
        resultados_analisis || null, 
        fecha_proxima || null,
        registroId
    ];

    bd.query(query, values, (error, resultados) => {
        if (error) {
            console.log('Error al actualizar el registro: ' + error);
            res.status(500).send('Error al actualizar el registro');
            return;
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});