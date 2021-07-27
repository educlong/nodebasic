const mongoose = require('mongoose');/*đầu tiên muốn sử dụng đc mongoose thì cần khai báo 1 require (lấy đường dẫn)*/

/**trong mongoose này thì tất cả collection muốn sử dụng đc vs nodejs thì cần phải convert quy ra 1 kiểu đgl Schema*/
const adminProject = new mongoose.Schema(   /**collection adminProject. kindOfProject và title đều có kiểu */
    {   kindOfProject: 'string',            /**string (có ràng buộc dữ liệu) */
        title: 'string',                    /**có thể cho kiểu dữ liệu là 'string' hoặc {type: String} đều đc */
        backgroundImage: {type: String},
        imgProject: {type: Array} 
    }, {collection: "adminProject"}  
);  /**muốn sử dụng mongoose này trong những file khác thì cần phải export nó ra*/
module.exports=mongoose.model("adminProject", adminProject);