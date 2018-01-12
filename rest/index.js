// set up the web server
/*const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

var restify = require('restify');

/*function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}*/

var server = restify.createServer();
//server.get('/hello/:name', respond);
//server.head('/hello/:name', respond);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

