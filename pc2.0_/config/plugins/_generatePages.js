const htmlWebpackPlugin = require('html-webpack-plugin');
const routers = require('../../src/routers');
const _config = require('../../src/_config');
const uglifyPlugin = require('uglifyjs-webpack-plugin');
const ENV = require('../env.js');

const config = _config.htmlWebpackPluginConfig;


//遍历路由，配置htmlWebpackPlugin
var pages = routers.pages,
htmlConfig = [];
//生产模式
if(ENV == 'build') {
    //js压缩功能由 -p 代替，原因是此插件打包时会报错，-p参数会自动过滤那些压缩报错的js；如ejs的tpl模板
    
    htmlConfig.push(new uglifyPlugin({
        compress : {
            warnings : false
        }
    }));
    
    config.minify = {
        htmlminify : true,
        collapseWhitespace : true,
        removeAttributeQuotes : true
    };
    config.showErrors = false;
}
for(let i=0,len=pages.length; i<len; i++) {
    const page = pages[i];
    htmlConfig.push(new htmlWebpackPlugin({
        template : page.path,
        filename : page.path.replace('./src/pages/',''),
        minify : page.minify || config.minify,
        hash : (function() {
            if(page.hash === false) return false;
            if(page.hash === true) return true;
            return config.hash;
        })(),
        chunks : page.chunks || (function() {
            const _arr = page.path.split('/');
            return config.chunks.concat(_arr[_arr.length-1].split('.')[0]);
        })(),
        showErrors : false
    }));
}

module.exports = htmlConfig;