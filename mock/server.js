const http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Content-Type, token',
    });
}).listen(3012);

console.log('----------数据mock启动------------');
console.log('--------正在监听3012端口-----------');