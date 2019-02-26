let address = require("../config/getIPAddress");
module.exports = {
    defaultConfig : {
        names : ['base','jquery'],
        filename : 'assets/js/[name].js',
        minChunks : 2
    },
    globalJs : {
        echarts : 'echarts'
    },
    htmlWebpackPluginConfig : {
        hash : false,
        inject : true,
        chunksSortMode : 'manual',
        chunks : ['jquery','base'],
        minify : false,
        showErrors : true
    },
    proxy: {
        '/api/**': {
          target: 'http://192.168.2.11:8012/', // 开发环境api地址
        }
    },
    host : address,//可选参数，默认为localhost
    port : 8083  //可选参数，默认为8081
};
