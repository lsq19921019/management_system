/**
 * crete：田鹏伟 2018-12-29
 * desc：webpack配置文件
 */
let path = require('path');  //nodeJs path模块
let webpack = require('webpack');  //webapck模块 
let MiniCssExtractPlugin = require("mini-css-extract-plugin");  //抽离公共css https://github.com/webpack-contrib/mini-css-extract-plugin
let initHtml = require('./config/initHtml');
let ip = require('./config/getIp');
module.exports = {
    //入口文件
    entry : initHtml.entryConfig,  

    //出口配置
    output : {
        filename : 'assets/js/[name].[hash:5].js',
        publicPath : '/',
        path : path.resolve('./dist'),  //开发者硬盘绝对目录
    },

    //模块配置
    module : {
        rules : [
            //es6/7转es5
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use : {
                    loader: 'babel-loader',
                    options:{
                        cacheDirectory:true//缓存
                    }
                }
            },
            //css
            {
                test : /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../../'  // 根据打包输出位置查找打包根目录位置 dist/assets/css/
                        }
                    },
                    "css-loader",
                    'postcss-loader'
                  ]
            },
            //sass
            {
                test : /\.scss$/,
                use : [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ]
            },

            //图片
            {
                test : /\.(jpg|png|gif|jpeg)$/i,
                use : {
                    loader : 'url-loader',
                    options : {
                        limit : 10000,  //小于10kb的图片转base64，减少网络请求
                        name : '[name].[hash:8].[ext]',
                        outputPath : 'assets/images/'
                    }
                }
            },
            {
                test : /\.html$/,
                use : 'html-withimg-loader'
            },{
                test : /\.tpl$/,
                use : 'ejs-loader'
            }

        ]
    },

    //插件配置
    plugins : [
        //抽离css
        new MiniCssExtractPlugin({
            filename: "assets/css/base.css",
            chunkFilename: "[id].css"
        }),
        //自动加载模块，无需导出import或者require
        new webpack.ProvidePlugin({
            $ : 'jquery',
            // echarts : 'echarts'
        }),
        //抽离复用频率高的公共js文件单独打包
        new webpack.optimize.SplitChunksPlugin({
            chunks : 'all',
            minSize: 20000000,  //设置大一点防止影响到cacheGroups配置
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                // node_modules 包模块内公共模块打包成一个文件
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name : 'vendors',
                    minChunks: 3,  //如果超过minChunks个页面引用或者大于minSize字节则抽离到公共文件
                    minSize : 20000,
                    priority: 3,  //引用优先级，值越大越优先引用
                },
                // pub 本地公共类库打包
                commons : {
                    test : /[\\/]pub[\\/]/,
                    name : 'commons',
                    minChunks: 3,  //如果超过minChunks个页面引用或者大于minSize字节则抽离到公共文件
                    minSize: 100,
                    priority : 2
                }        
            }
        }),
        ...initHtml.htmlConfig
        
    ],

    //开发服务器配置
    devServer : {
        contentBase : path.resolve(__dirname,'dist'),  //监听文件目录-开发者硬盘绝对目录
        host : ip || 'localhost',
        port : 1717,  //监听端口
        open : true,  //自动打开浏览器
        compress : true,  //是否启动gzip压缩
    },

    mode : 'development'
};