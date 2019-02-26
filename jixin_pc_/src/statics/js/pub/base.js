let renderFooter = require('../../../pages/pub/footer/renderFooter');
module.exports = {
    //默认执行函数，方便引入默认文件
    init : (function() {
        require('../../css/base.css');
    })(),
    //显示页面主体
    showPage() {
        $('.wrap').css('opacity',1);
        $('.page_loading').hide();
    },
    //加载公共模块
    initModule(arr) {
        renderFooter();
    }
};