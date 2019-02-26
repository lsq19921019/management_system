/**
 * create : 田鹏伟 2018-12-10
 * desc : 运营管理-banner统计
 */
module.exports = {
    //校验规则
    check : {
    },
    //需要展示的字段
    keys : {
    },
    //搜索字段
    searchKeys : {
        startDate : '',  //开始日期
        endDate : '',  //结束日期
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {

            case 'calculDateDesc':
            label = '统计日期';
            break;

            case 'bannerUrl':
            label = '链接地址';
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