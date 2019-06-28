var net = require('net');
var ip = '192.168.0.24'
var cliente = new net.Socket();

cliente.connect(3000, ip , function() {
	console.log('Conectado al host:', ip);
	cliente.write('Soy un cliente.');
});

cliente.on('data', function(data) {
	console.log('Servidor: ' + data.toString());	
});

cliente.on('close', function() {
	console.log('El servidor: ' + ip + ' se desconecto.');
});
