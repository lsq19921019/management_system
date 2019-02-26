let base = require('../pub/base.js');
require('../../css/resource_services.scss');

let readerHeader = require('../../../pages/pub/header/renderHeader');

//显示页面内容
base.showPage();
//显示公共模块
base.initModule();

//加载头部模块
readerHeader();