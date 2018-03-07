var path = require('path');
var express = require( 'express' );
var app = express();
var request = require('request');
var cors = require('cors');

// Definición del lenguaje del motor de renderizado
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../demo'));

// Configuración de rutas estrictas para diferenciar si llevan o no slash (/) al final
app.set('strict routing', true);

// Definición de carpetas públicas
app.use('/', express.static( path.join(__dirname, '../demo')));

// Enable All CORS Requests
app.use(cors());

// Configuración del enrutamiento
app.get('/', function(req,res) {
	res.render('index')
});

// Inicialización del servidor a través del puerto especificado
app.listen(3000);