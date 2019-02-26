const webpack = require('webpack');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const copyPlugin = require('copy-webpack-plugin');
const _config = require('../src/_config');
const htmlConfig = require('./plugins/_generatePages');

var plugins = [
    new webpack.optimize.CommonsChunkPlugin(_config.defaultConfig),
    new webpack.ProvidePlugin(_config.globalJs),
    new extractTextPlugin('assets/css/base.[hash:5].css'),
    new copyPlugin([
        {
            from : path.resolve(__dirname,'../src/assets/data'),
            to : path.resolve(__dirname,'../dist/assets/data')
        }
    ]) 
];

module.exports = plugins.concat(htmlConfig);
