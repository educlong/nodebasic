/* Cài đặt framework express code for node js (cài đặt sử dụng template engine của express là EJS => trong file js có thể viết đc html):
    Bước 1: Tạo 1 folder lưu trữ toàn bộ project trong visual studio code (Nodejs)
    Bước 2: Trong trình soạn thảo code, Chuột phải vào folder vừa tạo -> chọn Open in Intergrated Terminal
    Bước 3: trong màn hình terminal dưới màn hình soạn thảo, gõ đoạn code: npm install express-generator -g => Enter
    Bước 4: Hệ thống tự động cài đặt 1 bộ khung application trong ổ C
    Bước 5: Để tạo ra 1 folder trong project 
        (folder này trùng tên vs tên project, folder này chứa sẵn các folder cần sử dụng cho 1 dự án dùng express)
            gõ code trong terminal: express <tên folder> -e => Enter (express nodeExpress -e => Enter)
    Bước 7: Review các folder
        7.1: Folder nodeExpress/bin => folder này chứa các file server của dự án, có sẵn file www (tạo sẵn http=require, port=3000)
        7.1: Folder nodeExpress/public => tạo sẵn folder images, javascript, và style css
        7.3: Folder nodeExpress/routes => dùng để module/exports cho router
        7.4: Folder nodeExpress/view => zao diện, ở đây express dùng template tên là jade
        7.5: File app.js => file lập trình (trong file này chứa nhiều module, nhưng k có trong template này => cần cài thêm)
    Bước 8: Cài đặt thêm các module tương ứng vs các require trong file app.js
        Để cài thêm, trong visual studio code, chuột phải vào folder nodeExpress => chọn Open in Intergrated Terminal
        Trong màn hình terminal, gõ: npm install => Enter, hệ thống sẽ tự động install tất cả những module có trong app.js
        (Để ý trong file package.json có mục dependencies liệt kê ra những version của các module hỗ trợ cho framework này)
        Do đó, ở đây chỉ cần gõ: npm install thì hệ thống sẽ tự động tìm những module này và cài đặt luôn 
        => Hệ thống sẽ tự động tạo ra folder node_modules chứa tất cả những modules này
    Bước 9: Trong màn hình terminal, gõ: npm start  => hệ thống sẽ mở cổng 3000
    Bước 10: Chạy thử trên Edge: gõ: localhost:3000 => enter
    Bước 11: mở file view/index.ejs
    Bước 12: xử lý routes/index.js
    Bước 13: Cài đặt session, gõ trong terminal của nodeExpress: npm install express-session => Enter (session ko có s cuối)
    Bước 14: Cấu hình cho session, vào app.js
    Bước 15: Cấu hình lại visual studio để nhận biết file *.ejs thành file .html (hỗ trợ gõ code nhanh)
            => File => preferences => setting => search: Files: Associations => Add item (vs item là *.ejs và value là .html) => save
    Bước 16: Tạo folder models để tương tác vs csdl
    Bước 17: Để load data từ models ra views => cấu hình locals trong app.js
    Bước 18: Cấu hình đường dẫn cố định cho project trong app.js 
        (VD project Demo2: app.use("/portfolioDemo2",express.static(__dirname + "/portfolioDemo2"));)

    TƯƠNG TÁC VS DATABASE
    Bước 19: Hỗ trợ upload file -> cài đặt module multer, trong màn hình terminal dưới màn hình soạn thảo, gõ đoạn code: npm install multer => Enter
    Bước 20: Config cho module multer, khác vs các module khác config trong file app.js 
        Module multer đc config trong file routes: routes/portfolioDemo2. Mở file routes/portfolioDemo2 và config cho module multer
    Bước 21: Tạo 1 folder trong public/portfolioDemo2/upload chứa tất cả các file đc upload lên
    Bước 21 (extend): Xử lý upload nhiều image -> cài đặt module dropzone, gõ: npm install dropzone -> enter
        21.1 (extend): link 2 file css và js của dropzone lại vs nhau bằng cách:
            - copy file dropzone.js trong folder nodeExpress\node_modules\dropzone\dist vào folder nodeExpress\public\portfolioDemo2\css 
            - copy file dropzone.css trong folder nodeExpress\node_modules\dropzone\dist vào folder nodeExpress\public\portfolioDemo2\js
        21.2 (extend): link 2 file dropzone.js và dropzone.css vào file ejs muốn code (file admin.ejs)
        21.3 (extend): xử lý code. Để có nhiều tùy chọn, đọc và tham khảo tại: https://www.sitepoint.com/file-upload-form-express-dropzone-js/


    Bước 22: Cài đặt database MongoDB (là 1 DATABASE theo kiểu hướng đối tượng và các bảng là kiểu JSON) tại https://www.mongodb.com/try/download/community
        Các thuật ngữ, search google hình ảnh từ khóa "RDBMS and MongoDB" sẽ zải thích hết (VD: bảng trong mysql là table, còn trong MongoDB là Collection)
        Có 2 cách thao tác trên mongodb, 1 là thao tác trêm cmd và 2 là download zao diện robomongo cho mongodb (=>chọn cách 1)
        Bước 22.1: vào đường dẫn cài đặt mongodb: C:\CodDevProgConfig\MongoDB\Server\4.4\bin, 
            Cách 22.1.1: tại đây gõ: shift + right_click => chọn Open PowerShell window here
            Cách 22.1.2: dùng visual studio code, tương tự như mở Open in Intergrated Terminal trong 1 project ndoejs
        Bước 22.2: Tạo 1 folder c:/data/db để lưu trữ csdl mà server mongodb tạo ra (nếu k tạo thì khi khởi động server moongodb thì sẽ báo lỗi)
        
        ***)7 lệnh cơ bản của mongodb:
            1/ mongod -> enter => khởi động server mongodb (port mặc định của mongodb là 27017)
            2/ Trong visual studio code, chuột phải vào file mongo.exe => chọn Open in Intergrated Terminal 
                để mở thêm 1 cửa sổ nữa, gõ: mongo -> enter để bắt đầu truy vấn
            3/ Tại Terminal vừa gõ mongo có thể gõ tiếp các lệnh tiếp theo, thứ nhất là: show dbs -> enter => hiển thị tất cả database 
                (đầu tiên sẽ có 3 data là admin, config và local)
            4/ thứ 2 là: use <tên csdl> -> enter => nếu đã có csdl này thì sử dụng, nếu k có thì tạo mới
            5/ thứ 3 là: show collections -> enter => hiển thị tất cả collections (table) trong database này
            6/ thứ 4 là tạo 1 bảng trong csdl này: db.createCollection('<tên bảng>') -> enter => tạo ra 1 bảng dữ liệu trong db này
            7/ thứ 5 là: db.dropDatabase() -> enter => để xóa csdl đang sử dụng (nhưng trước khi xóa thì gọi lệnh: use <tên csdl> trước đã)
        ***)Các lệnh khác
            8/ db.<tên collection>.insert(<dữ liệu kiểu json>) -> enter => thêm document vào collection
            9/ db.<tên collection>.find() ->enter => hiển thị tất cả document trong collection dạng json một dòng
            10/ db.<tên collection>.find().pretty() ->enter => hiển thị tất cả document trong collection dạng json nhiều dòng
            11/ db.<tên collection>.update({<điều kiện>},{$set:{<update cái zì>}},{upsert: true, multi:true}) -> enter
                zải thích:  */ multi=true -> zả sử có 2 trường thỏa <điều kiện> thì đều cập nhật cả 2
                            */ multi=false-> thì chỉ cập nhật trường đầu tiên tìm đc thôi
                            */  $set -> đặt lại zá trị, 
                                $unset -> xóa zá trị cũ đi
                                $rename -> đổi tên trường trong document, 
                                    VD có đổi tên trường "kind" thành "kindProject" trong "kind" : "BRANDING, WEB DESIGN2",
                            */ upsert -> up nghĩa là update, sert nghĩa là insert 
                                => nếu upsert=true -> nếu document cần update chưa có thì tự động insert 1 document mới và insert vào,
                                => nếu upsert=false -> nếu document cần update chưa có thì bỏ qua.
                VD update document: db.adminProject.update({"id":2},{$set:{"client":"Paul Long- long.hx"}},{upsert:true, multi:true})
                VD delete document: db.adminProject.update({"id":2},{$unset:{"client":"Paul Long- long.hx"}},{upsert:true, multi:true})
                VD rename document: db.adminProject.update({},{$rename:{"kind":"kindOfProject"}},{upsert:true, multi:true})
                    Nếu k để <điều kiện>, thì sẽ update lại tất cả trong collection -> VD rename trên
                Để tra cứu câu lệnh điều kiện -> search google: "mongodb document" (hoặc search https://docs.mongodb.com/manual/reference/operator/query/)
            12/ db.<tên collection>.remove({<điều kiện>},{justOne:true}) -> enter 
                => xóa 1 collection theo điều kiện, nếu xóa 1 thì justOne=true, nếu xóa nhiều thì just one =false
            13/ import và export data ra 1 file. 
                Để import/export cần tải thêm mongodb database tools tại https://www.mongodb.com/try/download/database-tools?tck=docs_databasetools
                và zải nén folder bin trong file rar vào C:\CodDevProgConfig\MongoDB\Server\4.4\bin mới import hay export đc.
                (để export/import cần tạo 1 terminal mới. Tại visual studio code, chuột phải vào 1 file => chọn Open in Intergrated Terminal)
                13.1: export 
                    13.1.1: export database     : mongodump -d <tên database> -o "<trỏ đến tên folder cần export>"
                        VD: mongodump -d adminPortfilioDemo2 -o "D:\CodDevProgTeaching\Nodejs\nodeExpress\models" 
                            ->xuất db adminPortfilioDemo2 ra folder models
                    13.1.2: export Collection   : mongoexport -d <tên database> -c <tên collection> -o "<tên file>.json"
                        VD: mongoexport -d adminPortfilioDemo2 -c adminProject -o "D:\CodDevProgTeaching\Nodejs\nodeExpress\models\adminProject.json" 
                            ->xuất db adminProject ra adminProject.json
                        
                13.2: import
                    13.2.1: import database     : mongorestore -d <tên database> "<trỏ đến tên folder cần import>"
                    13.2.2: import Collection   : mongoimport -d <tên database> -c <tên collection> --file "<tên file>.json"
    Bước 23: Để project kết nối vs database, cần cài đặt thêm module: npm install mongodb -> enter
    Bước 24: Đầu tiên phải kết nối database trước đã, kết nối database trong file routes/portfolioDemo2.js
        Trước khi kết nối database cần phải tạo database và khởi động mongod lên trước đã 
            => quay lại bước 22 để kết nối database tại file C:\CodDevProgConfig\MongoDB\Server\4.4\bin
    Bước 25: Cài đặt plugin Mongoose hỗ trợ mongodb, gõ: npm install mongoose
    Bước 26: Phần kết nối csdl: Để có thể kết nối vs tất cả các file thì nên để trong file app.js -> vào file app.js để connect
    Bước 27: Phần kết nối đến collection: Mongoose yêu cầu tạo ra 1 file models để kết nối (đã tạo)
        Trong models, tạo 1 file adminProject.js (đây là file chứa collection cần truy vấn), models sẽ kết nối vs collection là adminProject

    TƯƠNG TÁC VS DATABASE POSTGRESQL
    Bước 28: Cài đặt database Postgresql tại https://www.postgresql.org/download/ => nặng hơn rất nhiều.
        Sau khi cài đặt -> mở công cụ để quản lý hệ quản trị csdl này: cửa sổ + pgadmin
    Bước 29: Cài đặt thêm 1 module để zao tiếp vs postgresql trong nodejs, gõ: npm install pg
        XỬ LÝ KẾT NỐI DATABASE POSTGRESQL TRONG FILE ROUTES

    :::PHẦN CUỐI: ĐÓNG GÓI ỨNG DỤNG: -> gõ: npm run build -> hệ thống sẽ đóng gói thành 1 file build, upload file build này lên server (website và chạy)



    Demo1: Blog
    Bước 1: Copy 1 template mẫu download về đưa vào view (templateBlogDemo1) => Sau đó sắp xếp lại folder
    Bước 2: Cut các folder css, js, accets/img từ templateBlogDemo1 qua public, vì nguyên lý của express là các folder này phải để ở public
    Bước 3: Thay đổi các link cho các file css và js trong templateBlogDemo1/index.ejs 
        (Yêu cầu cần có dấu / trước link, ==> <script src="/javascripts/scripts.js"></script>, <link href="/stylesheets/styles.css" rel="stylesheet" />)
    Bước 4: Xử lý link cho các thẻ a trong các file ejs
    Bước 5: Xử lý routes => tạo 1 file mới routes/blogDemo1.js và định nghĩa trong app.js


    Demo2: portfolio, tải theme từ page themelock.com
    Bước 1: Tạo 1 folder portfolioDemo2 trong views: views/portfolioDemo2
    Bước 2: Tương tự bước 2 => bước 5 (Demo1)
    Bước 3: Cấu hình đường dẫn cố định cho project trong app.js (app.use("/portfolioDemo2",express.static(__dirname + "/portfolioDemo2"));)
    Bước 4: Code trong 2 page personal-portfolio.ejs và single-project
    


*/