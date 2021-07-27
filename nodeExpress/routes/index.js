var express = require('express');
var router = express.Router();





/* GET home page. */
router.get('/', function(req, res, next) {  /* dấu / là load trang home (render('index', ...) => load index.ejs trong view*/
  res.render('index', { title: 'Express' });
});



/* GET home news. *//**Có thể truyền biến vào bằng cách /:<tên biến> , có thể dùng dấu /, - hoặc . VD: /:chisoAdmin/:gender*/
router.get('/admin/:chisoAdmin/:gender', function(req, res, next) {   /*hoặc /:chisoAdmin-:gender hoặc /:chisoAdmin.:gender*/
  var dataSv = {studentLst: ["obama","trump","biden"]}; /*tạo mảng và đưa vào view */ /**Dưới là đưa admin vào cookie để các*/
  res.cookie("dulieuAdmin", req.params.chisoAdmin+". "+req.params.gender, {maxAge:9000});/**page khác đều lấy đc, time sống*/
  req.session.adminSession=req.params.chisoAdmin+". "+req.params.gender;/*của cookie này là 9000ms, sau time cookienày tựhủy*/
  res.render('admins',{/*load đến admins.ejs trong view*/         /**Tuy nhiên cookie ko bảo mật, dùng session bảo mật hơn */
    title: 'Quản trị - Admin', 
    listSv: dataSv, 
    adminIndex: "mã admin: "+ req.params.chisoAdmin+", gender: "+req.params.gender });  /**req là chỉ số mà user gửi lên,*/
});


/**VD về routes: regular expression */  /**admindata(hx)?, dấu ? sau chữ chuỗi trong () -> chuỗi () có thể có, có thể k */
router.get("/admindata(hx)?-*.vn", function(req,res){ /**Có thể gõ admindatahx-.vn hoặc admindata-.vn đều đc */
  res.send("du lieu admin: "    /**Dấu ? sau 1 ký tự dùng để ràng buộc dữ liệu xuất hiện theo kiểu zì */
        +"<br>Lấy data bằng cookie:"  +req.cookies.dulieuAdmin    /*Dấu * tác dụng để gõ bất cứ ký tự nào vào đều đc hết */
        +"<br>Lấy data bằng session:" +req.session.adminSession); /*Ở trên lấy dữ liệu trong cookie và session ra*/
  //res.clearCookie("dulieuAdmin"); /**clearCookie để clear cookie*/
  res.session.destroy(function(err){console.log(err);}); /**destroy để hủy session, cần có 1 function để log ra error*/
}); 

module.exports = router;
