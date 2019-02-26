let base = require("./pub/base.js");
require("../css/index.scss");

let readerHeader = require('../../pages/pub/header2/renderHeader2');

//显示页面内容
base.showPage();
//显示公共模块
base.initModule();

//加载公共模块
readerHeader();