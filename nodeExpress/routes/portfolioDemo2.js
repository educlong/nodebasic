var express = require('express');
var router = express.Router();





/*================== Portfolio Demo2 ========================*/
/* (/portfolioDemo2/ đc định nghĩa trong app.js) */

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