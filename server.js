// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var util=require('util');


var jsonfile = require('jsonfile');
// Simple in-memory store for now
var dreams = [];

var file = './nodos.json';


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

function tira(entrada,rel)//sigue el curso de una fibra
{for (var i=0; i<entrada.length;i++)
  	{if(entrada[i].dest==rel)
  		{
  			rel=entrada[i].orig;
  			dreams.push(rel);
  			i=0;//porque si existe conexión, solo puede ser una
  		}
  	}

}

function rel0(cto){
  
  dreams.push(cto);
    
  var obj=jsonfile.readFileSync(file);//para qué tanta lectura, lo hago global?
  //console.dir(obj);
  var rela=obj.rel;
  var cou=0, rel1=0;
  
  for (var i=0; i<rela.length;i++)
  	{if(rela[i].dest==cto)//está siendo alimentada
  		{cou++; 
        rel1= rela[i].orig;
       var msg=util.format('splitter %d:',cou);
       dreams.push(msg);
        dreams.push(rel1);
  			tira(rela,rel1);//seguir la tirada
  		}
  	}
  //En el caso de CTO vamos a saber el número se 2ndSplit
  	if (cou==0) {dreams.push('Valor no registrado');}//servirá para depurar la tabla automáticamente
    else {  msg=util.format('splitter %d:',cou); dreams.push(cou);   }
}
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
/*
app.get("/dreams", function (request, response) {
  response.send(dreams);
});*/

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams=[];
  var ctoList=rel0(request.query.dream);
  //response.sendStatus(200);
  response.send(dreams);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
