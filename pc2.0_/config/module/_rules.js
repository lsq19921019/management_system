const extractTextPlugin = require('extract-text-webpack-plugin');

var loaders = [
    {
        test : /\.css$/,
        use : [ {loader : 'style-loader'}, {loader : 'css-loader'}, {loader : 'postcss-loader'} ]
    },
    {
        test : /\.(jpg|png|gif)$/i,
        use : [
            {
                loader : 'url-loader',
                options : {
                    limit : 1,
                    name : '[name].[hash:8].[ext]',
                    outputPath : 'assets/images/'
                }
            }
        ]
    },
    {
        test : /\.js$/,
        use : 'babel-loader'
        //mark-压缩jquery的时候如果排除这个文件夹报错
        //exclude : /node_modules/
    },
    {
        test : /\.scss$/,
        use : [ {loader : 'style-loader'}, {loader : 'css-loader'}, {loader : 'postcss-loader'}, {loader : 'sass-loader'} ]
    },
    {
        test : /\.less$/,
        use : extractTextPlugin.extract({
            fallback : 'style-loader',
            use : [{loader : 'css-loader'}, {loader : 'postcss-loader'}, {loader : 'less-loader'}]
        })
    },
    {
        test : /\.html$/,
        use : 'html-withimg-loader'
    },{
        test : /\.html$/,
        use : 'html-loader'
    },{
        test : /\.tpl$/,
        use : 'ejs-loader'
    }
];
module.exports = loaders;