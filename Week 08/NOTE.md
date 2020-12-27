学习笔记

一、状态机

    1、State：状态，一个状态机至少要包含两个状态；
    
    2、Event：事件，执行某个操作的触发条件或者口令；
    
    3、Action：动作，事件发生以后要执行动作；
    
    4、Transition 状态变换，从一个状态变化为另一个状态；

二、HTTP请求
 
    1、Request 文本
    
    'POST / HTTP/1.1 \r\n
    X-Foo2: customed \r\n
    Content-Type: application/x-www-form-urlencoded \r\n
    Content-Length: 10 \r\n
    \r\n
    name=zhupq' \r\n
    

    2、Response 文本
    
    HTTP/1.1 200 OK \r\n     // HTTP/1.1 -> http协议；  200 -> 状态码；
    Content-Type: text/html \r\n
    Date: Mon, 21 Dec 2020 05:18:50 GMT \r\n
    Connection: keep-alive \r\n
    Keep-Alive: timeout=5 \r\n
    Transfer-Encoding: chunked \r\n
    \r\n
    b \r\n   \\ 16进制数字记录下方数量
    hello woild \r\n
    0 \r\n
    
    3、常用状态码：
    
    200 OK：表示从客户端发送给服务器的请求被正常处理并返回；
    204 No Content：表示客户端发送给客户端的请求得到了成功处理，但在返回的响应报文中不含实体的主体部分（没有资源可以返回）；
    206 Patial Content：表示客户端进行了范围请求，并且服务器成功执行了这部分的GET请求，响应报文中包含由Content-Range指定范围的实体内容。
    301 Moved Permanently：永久性重定向，表示请求的资源被分配了新的URL，之后应使用更改的URL；
    302 Found：临时性重定向，表示请求的资源被分配了新的URL，希望本次访问使用新的URL；
    301与302的区别：前者是永久移动，后者是临时移动（之后可能还会更改URL）
    303 See Other：表示请求的资源被分配了新的URL，应使用GET方法定向获取请求的资源；
    302与303的区别：后者明确表示客户端应当采用GET方式获取资源
    304 Not Modified：表示客户端发送附带条件（是指采用GET方法的请求报文中包含if-Match、If-Modified-Since、If-None-Match、If-Range、If-Unmodified-Since中任一首部）的请求时，服务器端允许访问资源，但是请求为满足条件的情况下返回改状态码；
    307 Temporary Redirect：临时重定向，与303有着相同的含义，307会遵照浏览器标准不会从POST变成GET；（不同浏览器可能会出现不同的情况）；
    400 Bad Request：表示请求报文中存在语法错误；    
    401 Unauthorized：未经许可，需要通过HTTP认证；    
    403 Forbidden：服务器拒绝该次访问（访问权限出现问题）    
    404 Not Found：表示服务器上无法找到请求的资源，除此之外，也可以在服务器拒绝请求但不想给拒绝原因时使用；
    500 Inter Server Error：表示服务器在执行请求时发生了错误，也有可能是web应用存在的bug或某些临时的错误时；
    503 Server Unavailable：表示服务器暂时处于超负载或正在进行停机维护，无法处理请求；
