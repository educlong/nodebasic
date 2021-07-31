var express = require('express');
var router = express.Router();





/*================== Portfolio Demo2 ========================*/
/* (/portfolioDemo2/ đc định nghĩa trong app.js) */

/**______ ROUTES CHO PHẦN ADMIN (+MULTER: upload file (hoặc image) -> chỉ upload 1 file )______ */
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








/**________VD DATABASE (+DROPZONE: upload nhiều file)__________*/

// dropzone
var imageDropzones=[]; /**tổng hợp các img sau khi upload lên thì đc lưu vào 1 biến mảng imageDropzones=[] */
/*uploadDropzoneDemo2: action từ form trong view truyền qua đây */
router.post('/uploadDropzoneDemo2', upload.any(), function(req, res, next) {    /**200 là mã thông báo upload thành công */
    // console.log(req.files); /**trường hợp upload 1 file -> req.file, upload nhiều file -> req.files là 1 đối tượng*/
    imageDropzones.push(req.files[0].filename);/**ảnh up lên có nhiều thông số đc lưu trong biến req.files -> in ra xem */
    // console.log(imageDropzones);    /*.push: lấy tên hình ảnh ra và đưa vào mảng tổng hợp imageDropzones khai báo ở trên*/
    res.status(200).send(req.files);/**upload đc rồi thì send file lên server đưa vào folder /public/portfolioDemo2/upload*/
}); 




/*example-admin-demo2: action từ form trong view truyền qua đây */
/**upload.single() là upload 1 file, upload.array() là upload nhiều file, upload.any() là upload 1 hay nhiều file đều đc*/
router.post('/example-admin-demo2', upload.single("imageProjectDemo2"), function(req, res, next) {/**Chú ý kiểu gửi là post*/
    console.log(req.body.titleProjectDemo2);  /**titleProjectDemo2 và imageProjectDemo2 lấy từ input trong view ra */
    console.log(req.file.filename);
    console.log(imageDropzones);/*tạo ra mảng imageDropzones để lưu kq của form uploadDropzoneDemo2,và gửi kèm vào form này*/
    var projectsJson ={ /**XEM TẠI: CÁCH 2-> MONGODB KẾT HỢP PLUGIN MONGOOSE ==> đoạn này trở đi tương tác vs moongose*/
        "title" : req.body.titleProjectDemo2,
        "backgroundImage" : req.file.filename,
        "imgProject" : imageDropzones
    }
    var aProject =new adminProjectModel(projectsJson); 
    aProject.save();
    imageDropzones=[];  /**sau khi save xong thì đưa mảng nảy về rỗng, để thực hiện load các img mới */
    res.redirect("/portfolioDemo2/admin-demo2");    /**add xong thì redirect trở về lại chính page admin-demo2 */
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



module.exports = router;