let htmlWebpackPlugin = require('html-webpack-plugin');  
let routers = require('../src/router');

let htmlConfig = [];
let entryConfig = {
    index : 'index'
};

for(let i=0; i<routers.length; i++) {
    let routeConfig = routers[i];
    let route = {
        template : './src/index.html',
        filename : 'index.html',
        chunks : ['vendors','commons'],
        minify : {
            htmlminify : true,  //html压缩
            collapseWhitespace : true,  //去除空格
            removeAttributeQuotes : true,  //去除属性引号
        }
    };
    route.chunks.push(routeConfig.module);
    //非首页特殊处理
    if(routeConfig.module != 'index') {
        route.template = routeConfig.template;
        route.filename = routeConfig.template.replace('./src/pages/','')       
    }
    //入口entry配置
    entryConfig[routeConfig.module] = routeConfig.entry;
    htmlConfig.push(new htmlWebpackPlugin(route));
}


module.exports = {
    htmlConfig, entryConfig
};