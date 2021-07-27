var app=require("./node1module1.js");
app.userName('long');


// Dựng server
var http = require("http"); 
var fs=require("fs");
http.createServer(
    // app.readHtml    //đọc html từ node1module1.js
    app.load_router //load router từ node1module1.js
).listen(3000);     //muốn truy nhập đc vào server dùng listen, cổng 3000 là mặc định của node js




