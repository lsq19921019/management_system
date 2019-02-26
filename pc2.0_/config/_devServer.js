const path = require('path');
const _config = require('../src/_config');
module.exports = {
    host : _config.host || 'localhost',
    port : _config.port || 8082,
    contentBase : path.resolve(__dirname,'../dist'),
    proxy : _config.proxy
    //inline : true
};