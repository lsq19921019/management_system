const path = require('path');
const o = {
    /*
        path+publicPath组成输出目录，必须是绝对路径，所有静态资源输出目录也基于此。所以，最好组成的是输出目录的根目录        
    */
    path : path.resolve(__dirname,'../dist'),
    publicPath : '/',
    filename : 'assets/js/[name].[hash:5].js'
};
module.exports = o;