var express = require('express');
var router = express.Router();





/*================== Portfolio Demo2 ========================*/
/* GET index-demo2. *//**Đường link localhost:3000/portfolioDemo2/index-demo2 (/portfolioDemo2/ đc định nghĩa trong app.js) */
router.get('/index-demo2', function(req, res, next) {    
    res.render('portfolioDemo2/index', { title: 'INDEX DEMO2 - My portfolio' });
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







module.exports = router;