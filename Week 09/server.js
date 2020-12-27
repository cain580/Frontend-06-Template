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
        response.end(
            `<html mmm=asdas>
               
                <head>
                    <style>
                        body{
                            width:60px;
                        }
                        body #id{
                            width:60px;
                        }
                    
                    </style>
                </head>
                <body>
                    <div>
                        <img id="id" src="/asdas" />
                    </div>
                </body>
            </html>`
        );
    })
}).listen(8088);
