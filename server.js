/**
 *
 *  url.- provee metodos que nos permite extraer las diferentes partes de una URL (como por ejemplo la ruta requerida y el string de consulta)
 *  querystring.- puede ser usado para parsear el string de consulta para los parámetros requeridos. Podemos tambien utilizar querystring para parsear 
 *     el cuerpo de una peticion POST en busca de parametros.
 *
 *                                    url.parse(string).query
 *                                               |
 *               url.parse(string).pathname      |
 *                           |                   |
 *                           |                   |
 *                         ------ -------------------
 *    http://localhost:8888/iniciar?foo=bar&hello=world
 *                                    ---       -----
 *                                     |          |
 *                                     |          |
 *                  querystring(string)["foo"]    |
 *                                                |
 *                             querystring(string)["hello"]
 *
 *
 *
**/
var http = require("http");
var url = require("url");

var PORT = 5623;

var iniciar = function(route, handle) {
  var onRequest = function(req, res) {
    var dataPost = "";
    var pathname = url.parse(req.url).pathname;
    console.log("Petición recibida para " + pathname);
    
    // Esperamos que la codificación de la información recibida sea UTF-8
    req.setEncoding("utf8");
    
    /**
     *   La idea es poner los callbacks data y end en el servidor, recogiendo todo los trozos de información POST en el
     *  callback data, y llamando al router una vez recibido el evento end, mientras le entregamos los trozos de información
     *  recogidos al router, el que a su vez se los pasa a los manipuladores de petición.
     **/
    var getData = function(datos) {
      dataPost += datos;
      console.log("Recibido trozo POST '" + datos + "'.");
    }
    req.addListener("data", getData);
    var getEnd = function() {
      /**
       *    Inyectaremos el objeto response (respuesta) (desde nuestra función de callback de servidor onRequest()) a
       *  través de nuestro router a los manipuladores de petición. Los manipuladores serán capaces de usar las funciones de este
       *  objeto para responder a las peticiones ellos mismos. 
       **/
      route(handle, pathname, res, dataPost);
    }
    req.addListener("end", getEnd);
    
    /*
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write("Hola Mundo !!!");
    res.end();
    */
  }
  http.createServer(onRequest).listen(PORT);
  console.log("Se ha inicializado el servidor");
}

exports.iniciar = iniciar;