var express  = require('express');
var app = express();

var net  = require('net');
var server = require('http').Server(app);

var io = require('socket.io')(server);
var os = require('os');

//console.log("socket ok");

var interfaces = os.networkInterfaces();
var addresses = [];

for(var k in interfaces) {//recorrer Y
  for (var k2 in interfaces[k]) {//recorrer X
    var address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address)
      console.log('HOST: '+addresses[0]);
    }
  }
}

var HOST = addresses[0];
var PORT = 3000;

var clientes = [];

net.createServer(function (socket) {
  cliente = socket.remotePort;
  clientes.push(cliente)

  console.log("Dispositivo " +socket.remoteAddress+':'+ socket.remotePort+' se conecto.');
  socket.write('Hola, soy el servidor.');//Mensaje al cliente.

  socket.on('data', function (data) {
    console.log('Data:',data.toString());
    console.log('Clientes conectados: ', clientes);
  })

  socket.on('connect', function() {
    console.log('Usuario nuevo');
    console.log('hola');
  })

  socket.on('close', function() {
    var exit = socket.remotePort;
    console.log('Usuario '+ exit + ' se desconecto.');

    var index = clientes.indexOf(exit);
    
    clientes.splice(index, 1);
    console.log('Clientes disponibles: ', clientes);
  })

}).listen(PORT, HOST)




//Investigar conexion CLOSE de socket en node js y agregarlo
//Crear un cliente en node js y conecarlo al servidor
//Responder del servidor al cliente
//Decodificar los mensajes que llegan al servidor a texto
//Agregar una lista de clientes conectados
//Imprimir los clientes activos, Verificar el cliente que se desconecto y eliminarlo de la lista
//de clientes conectados.

/*PARA EL PROYECTO*/ //Chat room
//Instalar nodemon a su proyecto
//Agregar git ignore
