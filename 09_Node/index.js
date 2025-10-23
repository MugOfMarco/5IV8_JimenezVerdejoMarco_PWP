console.log("Hola Mundo desde Node.js");

var http = require('http');

// req -> request es una solicitud, viene por parte de la arquitectura cliente-servidor, todos los clientes (navegadores) hacen solicitudes al servidor
// por parte del protocolo HTTP

// res -> response es la respuesta que el servidor le da al cliente (navegador)

var servidor = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/htmlcharset: utf-8' });
  res.write('<h1>Hola Mundo desde Node.js</h1>');
  console.log('Hola si entro');
    res.end();
});

//Es necesario poner un puerto para que el servidor escuche las solicitudes
servidor.listen(3000);
console.log('Servidor escuchando en el puerto 3000');