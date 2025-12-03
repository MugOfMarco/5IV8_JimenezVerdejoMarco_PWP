import express from 'express';
import path from 'path';

//aqui vamos a agregar las rutas que vamos a consumir

const app = express();
const PORT = process.env.PORT || 3000;

//definir los directorios para saber donde estara cada uno de los elementos
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend' , 'public')));

app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend', 'public'));

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

//importar las rutas