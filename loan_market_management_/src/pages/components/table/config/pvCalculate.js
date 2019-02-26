/**
 * create : 田鹏伟 2018-12-10
 * desc : 运营管理-平台点击数据
 */
module.exports = {
    //校验规则
    check : {
    },
    //需要展示的字段
    keys : {
        content : '',  //内容
        status : '',  //状态-单选框
    },
    //搜索字段
    searchKeys : {
        platformName : '',  //平台名称
        endDate : '',  //结束日期
        startDate : '',  //开始日期
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            case 'platformNo':
            label = '平台编号';
            break;

            case 'calculDateDesc':
            label = '统计时间';
            break;

            case 'platformName':
            label = '平台名称';
            break;

            case 'pvTotal':
            label = 'PV';
            break;

            case 'uvTotal':
            label = 'UV';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};