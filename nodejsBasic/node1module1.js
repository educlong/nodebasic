var name=function(username){
    console.log("username: "+username);
}

module.exports.userName=name;
// tạo npm: gõ trong terminal: npm init -> cấu hình cho các thuộc tính.
// tạo express: npm install express



var fs=require("fs");




var load_router=function(req, res){ // LOAD ROUTER
    var path=req.url;
    switch(path){
        case "/": 
            readHtml(req, res,"4.html");  //trường hợp trang chủ -> load page 4.html
            break;
        default: 
            readHtml(req, res,"4.html");
            break;
    }
}
module.exports.load_router=load_router;





var readHtml = function(req, res, filename){   /*tạo server vs request và response */

    // Đọc file html: cách 1
    // res.writeHead(200, {    // gửi mã cơ bản là writeHead và code cơ bản là 200, 404 là k tìm thấy  
    //     "Content-type": "text/html; charset=utf-8" // đầu tiên, quy định kiểu data gửi lên, kiểu text
    // });
    // res.write("<h1>first server is completely connected</h1>");   // gửi zì lên server? gởi đoạn text này lên
    // fs.ReadStream(filename).pipe(res);    // gửi file 4.html lên server, đọc file 4.html này


    // Đọc file html: cách 2
    fs.readFile(__dirname+"/"+filename,"utf-8",function(err,content){  // readFile, nếu lỗi, trả về err,
        if(err) console.log(err);
        else{
            res.writeHead(200, {    // gửi mã cơ bản là writeHead và code cơ bản là 200, 404 là k tìm thấy  
                "Content-type": "text/html; charset=utf-8" // đầu tiên, quy định kiểu data gửi lên, kiểu text
            });
            res.write("<h1>first server is completely connected</h1>");   // gửi zì lên server? gởi đoạn text này lên
            res.write(content); 
            res.end();
        }
    });
}
module.exports.readHtml=readHtml;