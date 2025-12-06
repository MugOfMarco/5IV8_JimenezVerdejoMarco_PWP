require('dotenv').config();
const express = require('express');
const path = require('path');
const juegoRouter = require('./routers/game.router');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Servir archivos estáticos
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

// Rutas
app.use('/api/juego', juegoRouter);


// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

