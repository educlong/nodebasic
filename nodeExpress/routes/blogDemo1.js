var express = require('express');
var router = express.Router();





/*================== Template Blog Demo1 ========================*/
/* GET indexDemo1. *//**Đường link localhost:3000/blogDemo1/indexDemo1 (/blogDemo1/ đc định nghĩa trong app.js) */
router.get('/indexDemo1', function(req, res, next) {    
    res.render('templateBlogDemo1/index', { title: 'INDEX DEMO1 - Clean Blog - Start Bootstrap Theme' });
});
/* GET aboutDemo1. */
router.get('/aboutDemo1', function(req, res, next) {
    res.render('templateBlogDemo1/about', { title: 'ABOUT DEMO1 - Clean Blog - Start Bootstrap Theme' });
});
/* GET postDemo1. */
router.get('/postDemo1', function(req, res, next) {
    res.render('templateBlogDemo1/post', { title: 'POST DEMO1 - Clean Blog - Start Bootstrap Theme' });
});
/* GET contactDemo1. */
router.get('/contactDemo1', function(req, res, next) {
    res.render('templateBlogDemo1/contact', { title: 'CONTACT DEMO1 - Clean Blog - Start Bootstrap Theme' });
});
  
module.exports = router;