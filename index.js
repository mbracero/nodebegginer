var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

// Manejador de peticiones
/**
 *      En JavaScript, los objetos son sólo colecciones de pares
 *   nombre/valor - piensa en un objeto JavaScript como en un diccionario con llaves de string.
 *
 *      Si los objetos JavaScript son sólo colecciones de pares nombre/valor, ¿Cómo pueden entonces tener métodos?
 *   Bueno, los valores pueden ser strings, números, etc... ¡O Funciones!
 *
 *      OK, Ahora, volviendo finalmente al código. Hemos decidido que queremos pasar la lista de requestHandlers
 *   (manipuladores de petición) como un objeto, y para lograr este acoplamiento débil, necesitamos usar la técnica de inyectar
 *   este objeto en la route() (ruta).
**/
var handler = {};
handler["/"] = requestHandlers.iniciar;
handler["/iniciar"] = requestHandlers.iniciar;
handler["/subir"] = requestHandlers.subir;

server.iniciar(router.route, handler);