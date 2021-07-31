var express = require('express');
var router = express.Router();





/*================== Portfolio Demo2 ========================*/
/* GET index-demo2. *//**Đường link localhost:3000/portfolioDemo2/index-demo2 (/portfolioDemo2/ đc định nghĩa trong app.js) */
router.get('/index-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/index', { title: 'INDEX DEMO2 - My portfolio' });
});
router.get('/2-columns-grid-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/2-columns-grid', { title: '2-columns-grid - My portfolio' });
});
router.get('/2-columns-grid-no-gap-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/2-columns-grid-no-gap', { title: '2-columns-grid-no-gap - My portfolio' });
});
router.get('/3-columns-grid-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/3-columns-grid', { title: '3-columns-grid - My portfolio' });
});
router.get('/3-columns-grid-no-gap-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/3-columns-grid-no-gap', { title: '3-columns-grid-no-gap - My portfolio' });
});
router.get('/about-me-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/about-me', { title: 'about-me - My portfolio' });
});
router.get('/about-us-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/about-us', { title: 'about-us - My portfolio' });
});
router.get('/agency-minimal-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/agency-minimal', { title: 'agency-minimal - My portfolio' });
});
router.get('/blog-list-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/blog-list', { title: 'blog-list - My portfolio' });
});
router.get('/blog-post-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/blog-post', { title: 'blog-post - My portfolio' });
});
router.get('/contact-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/contact', { title: 'contact - My portfolio' });
});
router.get('/interactive-links-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/interactive-links', { title: 'interactive-links - My portfolio' });
});
router.get('/irregular-grid-01-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/irregular-grid-01', { title: 'irregular-grid-01 - My portfolio' });
});
router.get('/irregular-grid-02-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/irregular-grid-02', { title: 'irregular-grid-02 - My portfolio' });
});
router.get('/metro-01-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/metro-01', { title: 'metro-01 - My portfolio' });
});
router.get('/metro-02-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/metro-02', { title: 'metro-02 - My portfolio' });
});
router.get('/personal-portfolio-demo2', function(req, res, next) {      /**VD tại page này */
    res.render('portfolioDemo2/personal-portfolio', { title: 'personal-portfolio - My portfolio' });
});
router.get('/single-project-demo2/*.:idProject', function(req, res, next) {/**VD tại page này */
    var idaProjectHistory= req.params.idProject;/**Chức năng thu thập data, lưu vào history những project đã xem */
    if (!req.session.projectHistory)/**Đầu tiên lấy id hiện tại ra(req.params.idProject), và tạo 1 mảng, nếu mảng này đã tạo*/
        req.session.projectHistory= [];/**rồi thì k cần tạo nữa. Sau đó đưa những id hiện tại vào mảng đã tạo projectHistory*/
    if (req.session.projectHistory.indexOf(idaProjectHistory)==-1)/*bằng lệnh push để lưu các id này vô history chính là các*/
        req.session.projectHistory.push(idaProjectHistory);/*project đã xem. Nhưng trước đó phải check xem data có trùng ko*/
    res.render('portfolioDemo2/single-project', { /**Check data trùng bằng indexOf, nếu đã có id này trước đó thì trả về vị*/
        title: 'single-project - My portfolio',   /**trí của id đó trong mảng. Nếu k có trả về -1,trả về -1 thì mới push vào*/
        id1Project: req.params.idProject,
        idProjectHistory : req.session.projectHistory   /**Hiển thị lên view chức năng history ngay tại page chi tiết */ 
    });
});

router.get('/portfolio-cards-demo2', function(req, res, next) {             /**VD tại page này, hiển thị projectHistory*/
    var idProjectHistories = (req.session.projectHistory) ? req.session.projectHistory : [];/**Check xem trong session có */
    res.render('portfolioDemo2/portfolio-cards', {  /**projectHistory hay k, nếu có thì lấy, nếu k có thì tạo mảng mới.*/
        title: 'portfolio-cards - My portfolio',    /**Các id đã đc lưu vào history trong mảng projectHistory đc lấy ra*/
        idProjectHistory : idProjectHistories       /**tại đây để hiển thị lên view chức năng history. Dùng biến */
    }); /**idProjectHistory (chứa các id) để hiển thị lên view -> zô view xửlý */
});








/**______ ROUTES CHO PHẦN ADMIN (+MULTER)______ */
var multer=require("multer");/*Bước 20: config cho multer, trước khi sử dụng cần khai báo đường dẫn khi upload thì lưu ở đâu*/
var storage = multer.diskStorage({      /**Bước 21: upload file vào folder update */
    destination: function (req, file, cb) {
      cb(null, './public/portfolioDemo2/upload')/**Bước 21: folder upload */
    },
    filename: function (req, file, cb) {    /**zả sử có nhiều người upload image trùng tên lên server thì uniqueSuffix sẽ*/
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)   /**tạo ra chuỗi số trước tên ảnh để khác tên*/
      cb(null, uniqueSuffix+ '-' + file.originalname)  /**originalname	là tên file trong computer  */
    }   /**originalname: (xem thêm mục API trong https://github.com/expressjs/multer) */
})
function fileFilterImg(req, file, cb) { /**zả sử user chỉ đc upload file img, nhưng user lại upload file .zip. Do đó, cần */
    // The function should call `cb` with a boolean /**có 1 function để lọc các file đc upload lên, chỉ cho upload file img*/
    // to indicate if the file should be accepted
    if (!file.originalname.match(/\.(jpg|png|gif|jpeg)$/))   /**nếu mà file đc upload lên (file.originalname) mà không (!)*/
        cb(new Error('chỉ đc upload file img')); /**phù hợp vs (.match) các file có đuôi (.) là jpg|png|gif|jpeg thì báo lỗi*/
    else cb(null, true); // To reject this file pass `false`, like so: /**còn ngược lại, nếu phù hợp (match) thì ok */  
}
var upload = multer({storage: storage, fileFilter: fileFilterImg})/*có 2params,1 là storage (upload file),2 là kiểu file img*/








/**________VD DATABASE (+DROPZONE)__________*/

// dropzone
var imageDropzones=[]; /**tổng hợp các img sau khi upload lên thì đc lưu vào 1 biến mảng imageDropzones=[] */
router.post('/uploadDropzoneDemo2', upload.any(), function(req, res, next) {    /**200 là mã thông báo upload thành công */
    // console.log(req.files); /**trường hợp upload 1 file -> req.file, upload nhiều file -> req.files là 1 đối tượng*/
    imageDropzones.push(req.files[0].filename);/**ảnh up lên có nhiều thông số đc lưu trong biến req.files -> in ra xem */
    // console.log(imageDropzones);    /*.push: lấy tên hình ảnh ra và đưa vào mảng tổng hợp imageDropzones khai báo ở trên*/
    res.status(200).send(req.files);/**upload đc rồi thì send file lên server đưa vào folder /public/portfolioDemo2/upload*/
}); 





/**upload.single() là upload 1 file, upload.array() là upload nhiều file, upload.any() là upload 1 hay nhiều file đều đc*/
router.post('/example-admin-demo2', upload.single("imageProjectDemo2"), function(req, res, next) {/**Chú ý kiểu gửi là post*/
    console.log(req.body.titleProjectDemo2);  /**titleProjectDemo2 và imageProjectDemo2 lấy từ input trong view ra */
    console.log(req.file.filename);
    console.log(imageDropzones);/*tạo ra mảng imageDropzones để lưu kq của form uploadDropzoneDemo2,và gửi kèm vào form này*/
    var projectsJson ={ /**XEM TẠI: CÁCH 2-> MONGODB KẾT HỢP PLUGIN MONGOOSE */
        "title" : req.body.titleProjectDemo2,
        "backgroundImage" : req.file.filename,
        "imgProject" : imageDropzones
    }
    var aProject =new adminProjectModel(projectsJson); 
    aProject.save();
    imageDropzones=[];  /**sau khi save xong thì đưa mảng nảy về rỗng, để thực hiện load các img mới */
    res.redirect("/portfolioDemo2/admin-demo2");
});












/**===================XỬ LÝ KẾT NỐI DATABASE MONGODB TRONG FILE ROUTES======================*/

const { MongoClient } = require("mongodb"); /**Search google: "connect nodejs to mongodb" là ra. Đoạn này là đoạn khai báo*/
const url ="mongodb://localhost:27017";     // Connection URI, zữ nguyên, ko chang
const client=new MongoClient(url,{useUnifiedTopology: true});//Create a new MongoClient, ba dòng code này zữ nguyên,k thay đổi
const dbName = "adminPortfilioDemo2";       /**tên database */
async function run() {      /**Code đoạn này để test */
  try {
    await client.connect();                         // Connect the client to the server
    await client.db(dbName).command({ ping: 1 });   // Establish and verify connection
    console.log("Connected successfully to server");//kết nối đc thì sẽ thông báo là kết nối thành công, còn ko thì vô finnaly
  } finally {
    await client.close();                           // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);



/**INSERT */
async function insertDocument(db, callback, aCollection, data){ /**insert 1 document */ /**copy từ google search vào */
    const collection = db.collection(aCollection);  // Get the documents collection => truyền collection vô adminProject
    collection.insert(data, function(err, result) { // Insert 1 document (bỏ bớt 1 số documents, ở đây chỉ insert 1)
        console.log('Inserted a document into the collection successfully!');
        callback(result);
    });
}
/**SELECT (truyền vào id, nếu id==NULL thì query hết, lấy hết data. Nếu id!=NULL thì chỉ query id có zá trị đc truyền vào ra thôi)*/
async function findDocuments(db, callback, aCollection, id) {   /**copy từ google search vào */
    const collection = db.collection(aCollection);      // Get the documents collection
    if (id==null)   /**hàm findDocuments này sẽ trả về data trong phần docs này, do đó khi sử dụng hàm này sẽ trả về 1 data*/
         collection.find({}).toArray(function(err, docs) {callback(docs);   });         /**Query hết nếu ko có id truyền vào */
    else collection.find({_id: id}).toArray(function(err, docs) {callback(docs);   });  /**Query theo id truyền vào */
};
/**DELETE */
const removeDocument = function(db, callback, aCollection, idRemove) {      /**copy từ google search vào */
    const collection = db.collection(aCollection);                          // Get the documents collection
    collection.deleteOne({ _id: idRemove }, function(err, result) {         // Delete document where _id trong mongodb = idRemove
      console.log('Removed the document with the field _id equal to '+idRemove);    /**remove success */
      callback(result);
    });
};
/**UPDATE */
const updateDocument = function(db, callback, aCollection, idUpdate, dataUpdate) {      /**copy từ google search vào */
    const collection = db.collection(aCollection);                                      // Get the documents collection
    collection.updateOne({ _id : idUpdate }, { $set: dataUpdate }, function(err,result){// khi mà _id trong mongodb = idUpdate
      console.log('Updated the document with the field a equal to 2');                  /**và $set để đưa data đc update vào */
      callback(result);
    });
};







/**=========== 2 CÁCH XỬ LÝ SELECT, INSERT, UPDATE, DELETE
 * =========== CÁCH 1-> KO SỬ DỤNG PLUGIN MONGOOSE => Cần kết nối db và viết các lệnh select, insert, update, delete như trên
 * =========== CÁCH 2-> MONGODB KẾT HỢP PLUGIN MONGOOSE => Tạo thành mô hình cấu trúc MVC ================================*/
/**KẾT NỐI MONGOOSE VS NODEJS */
/**Mỗi 1 database tạo ra thì có 1 url là: mongodb://localhost/<tên csdl> --> đây là url dẫn đến kết nối csdl 
 * Để có thể kết nối vs tất cả các file thì nên để trong file app.js -> vào file app.js để connect
*/



//insert
router.post('/addDataMongodbDemo2', function(req, res, next) {/**Chú ý kiểu gửi là post (xử lý cho form) => ĐỔ DATA VÀO MONGODB*/
    
    console.log(req.body.kindProjectMongodbDemo2);
    var projectsJson ={ /**định nghĩa 1 biến projectsJson lấy các info từ view đổ về, và đưa vào mongodb  */
        "kindOfProject" : req.body.kindProjectMongodbDemo2,
        "title" : req.body.titleMongodbDemo2
    }   /**INSERT */  
    
    /**CÁCH 1: select database từ mongodb native */
    // MongoClient.connect(url, function(err, client) {   /**connect vào rồi thì gọi hàm insertDocuments và truyền các đối số vào*/
    //     insertDocument(client.db(dbName), function() {client.close();}, "adminProject", projectsJson); });
    // res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi thêm data thành công thì cho redirect về page admin-demo2 */

    /**CÁCH 2: insert database từ mongodb sử dụng plugin mongoose  -> chỉ cần 3 dòng là thao tác đc vs db, 
     *                k cần select, insert, update, delete như cách 1 (vì đã tách models ra file models/adminProject.js riêng)*/
    /**Dùng model để lấy data đẩy vào view , trước tiên cần khai báo model tại: var adminProjectModel = require("../models/...*/
    var aProject =new adminProjectModel(projectsJson); /**Tạo 1 đối tượng model dựa trên phần tử projectsJson */
    aProject.save();    /**Sau đó save lại (insert vào) trong csdl      => mongoose thừa hưởng từ lập trình hướng đối tượng  */
    res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi thêm data thành công thì cho redirect về page admin-demo2 */
});


//select
router.get('/admin-demo2', function(req, res, next) {
    /**CÁCH 1: select database từ mongodb native */
    // MongoClient.connect(url, function(err, client) {   /**connect vào rồi thì gọi hàm findDocuments và truyền các đối số vào*/
    //     /**SELECT */
    //     findDocuments(client.db(dbName),function(dataReceived){/*dataReceived là biến findDocuments trả về khi đc gọi. Sau đó*/   
    //         res.render('portfolioDemo2/admin',{ title:'admin - My portfolio',data : dataReceived });/**đẩy vào view (data)*/
    //         client.close();
    //     },"adminProject", null); 
    // });

    /**CÁCH 2: select database từ mongodb sử dụng plugin mongoose  -> chỉ cần 3 dòng là thao tác đc vs db, 
     *                k cần select, insert, update, delete như cách 1 (vì đã tách models ra file models/adminProject.js riêng)*/
    /**Dùng model để lấy data đẩy vào view , trước tiên cần khai báo model tại: var adminProjectModel = require("../models/...*/
    adminProjectModel.find({},function(err,dataReceived){   /**lấy tất cả data -> k có đkiện find({}), trả về 2 trường hợp */
        res.render('portfolioDemo2/admin',{ title:'admin - My portfolio',data : dataReceived });
    })  /**1 là lỗi -> err, 2 là trả về dữ liệu (tên là dataReceived), nếu có data thì đưa vào page portfolioDemo2/admin */
});
var adminProjectModel = require("../models/adminProject.js")/**CÁCH 2: dùng mongoose thao tác vs database, cần khai báo 1 model*/

//delete
var _id=require("mongodb").ObjectID;/**lấy thư viện ObjectID để convert ra _id, bởi vì _id có chứa cả ObjectId() nên cần convert*/
router.get('/deleteProject-demo2/:idCanRemove', function(req, res, next) {
    /**CÁCH 1: select database từ mongodb native */
    // MongoClient.connect(url, function(err, client) {   /**connect vào rồi thì gọi hàm removeDocument và truyền các đối số vào*/
    //     removeDocument(client.db(dbName),function(){client.close();},"adminProject", _id(req.params.idCanRemove));/**ObjectId*/
    // }); /**DELETE */    
    // res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi delete data thành công thì cho redirect về page admin-demo2 */

    /**CÁCH 2: delete database từ mongodb sử dụng plugin mongoose  -> chỉ cần 3 dòng là thao tác đc vs db, 
     *                k cần select, insert, update, delete như cách 1 (vì đã tách models ra file models/adminProject.js riêng)*/
    /**Dùng model để lấy data đẩy vào view , trước tiên cần khai báo model tại: var adminProjectModel = require("../models/...*/
    adminProjectModel.findByIdAndRemove(_id(req.params.idCanRemove)).exec();/**xóa thì truyền id vào (chú ý convert sang _id())*/
    res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi delete data thành công thì cho redirect về page admin-demo2 */
}); /**exec() ->sau khi tìm ra theo id thì exec để thực thi phương thức remove */


//update
router.post('/updateProject-demo2/:idCanUpdate',function(req,res,next){/*Chú ý kiểu gửi là post(xửlý cho form)=>ĐỔ DATA VÔ MONGODB*/
    /**CÁCH 1: update database từ mongodb native */
    // var projectsJson ={ /**định nghĩa 1 biến projectsJson lấy các info từ view đổ về, và đưa vào mongodb  */
    //     "kindOfProject" : req.body.kindMongoEditDemo2,  /**kindMongoEditDemo2 lấy từ view */
    //     "title" : req.body.titleMongoEditDemo2          /**titleMongoEditDemo2 lấy từ view */
    // }
    // // console.log(_id(req.params.idCanUpdate));
    // // console.log(projectsJson);
    // MongoClient.connect(url, function(err, client) {   /**connect vào rồi thì gọi hàm removeDocument và truyền các đối số vào*/
    //     updateDocument(client.db(dbName),function(){client.close();},"adminProject", _id(req.params.idCanUpdate),projectsJson);
    // }); /**UPDATE */    
    // res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi update data thành công thì cho redirect về page admin-demo2 */
    
    /**CÁCH 2: update database từ mongodb sử dụng plugin mongoose  -> chỉ cần 3 dòng là thao tác đc vs db, 
     *                k cần select, insert, update, delete như cách 1 (vì đã tách models ra file models/adminProject.js riêng)*/
    /**Dùng model để lấy data đẩy vào view , trước tiên cần khai báo model tại: var adminProjectModel = require("../models/...*/
    adminProjectModel.findById(req.params.idCanUpdate,function(err,dataReceived){   /**lấy tất cả data dựa trên đkiện _id*/
        if(err) return handleError(err);/*Nếu lỗi->trả về lỗi. Chú ý lệnh trên ko phải find, mà là findById*/
        dataReceived.kindOfProject = req.body.kindMongoEditDemo2,
        dataReceived.title = req.body.titleMongoEditDemo2           /**kindMongoEditDemo2  và titleMongoEditDemo2 lấy từ view*/
        dataReceived.save(); /**kindOfProject và title là các trường trong collection adminProject. Lấy xong đưa vào và save lại*/
        res.redirect("/portfolioDemo2/admin-demo2");   /**sau khi update data thành công thì cho redirect về page admin-demo2 */
    })  /**1 là lỗi -> err, 2 là trả về dữ liệu (tên là dataReceived) lưu vào database và chuyển hướng đến page admin*/    
});














/**===================XỬ LÝ KẾT NỐI DATABASE POSTGRESQL TRONG FILE ROUTES======================*/
/**Bước 1: configuring a pool or client programmatically with connection information. Có 2 cách */
/**Cách 1*/
const { Pool, Client } = require('pg')  
const pool = new Pool({ //**Đầu tiên sẽ set các thông số để kết nối csdl, những thông số này lấy tại pgAdmin (postgresql) */
  user: 'postgres',     /**Mở pgAdmin lên, chuột phải vào PostgreSQL tại Browser -> Chọn properties -> chọn tab Connections */
  host: 'localhost',    /**và điền những thông số này vào */
  database: 'webpagenodejs',/**tên database: userLogin */
  password: '1001',     /**nhập password vào */
  port: 5432,
})
// pool.query('SELECT NOW()', (err, res) => {  /**Copy đoạn code này đưa vào router.get("/admin-postgresql-demo2") */
//   console.log(err, res)
//   pool.end()
// })

/**Cách 2 */
// const client=new Client({ //**Đầu tiên sẽ set các thông số để kết nối csdl, những thông số này lấy tại pgAdmin (postgresql) */
//     user: 'postgres',     /**Mở pgAdmin lên, chuột phải vào PostgreSQL tại Browser -> Chọn properties -> chọn tab Connections */
//     host: 'localhost',    /**và điền những thông số này vào */
//     database: 'webpagenodejs',/**tên database: userLogin */
//     password: '1001',     /**nhập password vào */
//     port: 5432,
//   })
//   client.connect()
//   client.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     client.end()
//   })




/**INSERT */
router.post('/addDataPostgresqlDemo2', function(req, res, next) {
    var date = new Date();
    var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    pool.query('INSERT INTO public."userLogin"('
                +'useradmin, userdatecreate, username, useremail, userpassword, isdelete)'  /**Câu lệnh query */
                +'VALUES ($1, $2, $3, $4, $5, $6)'
                , [false,months[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()  /**Zá trị query */ 
                , req.body.usernamePostgresqlDemo2          
                , req.body.emailPostgresqlDemo2, req.body.passwordPostgresqlDemo2, false]   /**chú ý dấu [] */
                , (err, dataReceived) => {   /**Nếu lỗi -> in ra err, còn k thì trả về dataReceived */
        process.on('unhandledRejection', err => {
            pool.end();
        });
    })
    res.redirect("/portfolioDemo2/admin-postgresql-demo2");/**sau khi thêm success thì redirect về page admin-postgresql-demo2*/
});


/**SELECT */
router.get('/admin-postgresql-demo2', function(req, res, next) {    /**Nếu lỗi-> in ra err, còn k thì trả về dataReceived*/
    pool.query('SELECT * FROM public."userLogin" WHERE isdelete=false ORDER BY id ASC',(err,dataReceived) =>{
        process.on('unhandledRejection', err => {
            pool.end();
        });
        // console.log(res.json(dataReceived.rows));   /**biến mảng này thành json để view có thể đọc đc */
        res.render('portfolioDemo2/admin-login',{ title:'admin - My portfolio',data : dataReceived.rows }); /**chú ý -> .rows*/
    })
});


/**DELETE */
router.get('/deletePostgresql-demo2/:idCanRemove', function(req, res, next) {
    /**Cách 1: Dùng Delete */
    // pool.query('DELETE FROM public."userLogin" WHERE id=$1',[req.params.idCanRemove],(err,dataReceived) =>{
    /**Cách 2: Để cột isdelete=true */
    pool.query('UPDATE public."userLogin" SET isdelete=$1 WHERE id=$2',[true,req.params.idCanRemove],(err,dataReceived)=>{

        process.on('unhandledRejection', err => {
            pool.end();
        });
    })
    res.redirect("/portfolioDemo2/admin-postgresql-demo2");/**sau khi thêm success thì redirect về page admin-postgresql-demo2*/
});


/**UPDATE*/
router.post('/updatePostgresql-demo2/:idCanUpdate',function(req,res,next){
    pool.query('UPDATE public."userLogin" '
                +'SET useremail=$1, username=$2 WHERE id=$3'     /**Câu lệnh query */    
                , [req.body.emailPostgreEditDemo2                /**Zá trị query */ 
                ,  req.body.usernamePostgreEditDemo2, req.params.idCanUpdate]               /**chú ý dấu [] */
                , (err, dataReceived) => {   /**Nếu lỗi -> in ra err, còn k thì trả về dataReceived */
        process.on('unhandledRejection', err => {
            pool.end();
        });
        console.log(dataReceived);
    })
    res.redirect("/portfolioDemo2/admin-postgresql-demo2");/**sau khi thêm success thì redirect về page admin-postgresql-demo2*/
});





module.exports = router;