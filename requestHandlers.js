var exec = require("child_process").exec;
var querystring = require("querystring");

var iniciar = function(response) {
  console.log("Manipulador de peticion 'iniciar' se ha llamado");
  var body = '<html>'+
      '<head>'+
      '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
      '</head>'+
      '<body>'+
      '<form action="/subir" method="post">'+ // Vemos que realizamos peticion POST a subir
      '<textarea name="text" rows="20" cols="60"></textarea>'+
      '<input type="submit" value="Submit text" />'+
      '</form>'+
      '</body>'+
      '</html>';
  
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();

  /* Descomentar para chequeo de peticion NO-bloqueante
  exec(//"ls -lah", // Operacion menos costosa
      "find /", // Operacion mas costosa
      { timeout: 10000, maxBuffer: 20000*1024 },
       function (error, stdout, stderr) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(stdout);
        response.end();
      });
   */
}

var subir = function(response, dataPost) {
  console.log("Manipulador de peticion 'subir' se ha llamado");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("Enviaste: " + querystring.parse( dataPost )["text"] );
  response.end();
}

exports.iniciar = iniciar;
exports.subir = subir;