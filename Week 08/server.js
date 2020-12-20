const http = require('http');

http.createServer((request,response) => {
    let body = [];
    request.on('error',(err) => {
        console.error(err);
    }).on("data",(chunk) => {
        body.push(chunk.toString());
    }).on('end',() => {
       // body = Buffer.concat(body).toString();  // 报错 body 是 数组不是 Buffer
        console.log("body",body);
        response.writeHead(200,{'Content-Type': 'text/html'});
        response.end("hello woild");
    })
}).listen(8088);
