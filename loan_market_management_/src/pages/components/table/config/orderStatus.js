/**
 * create : 田鹏伟 2018-12-28
 * desc : 运营管理-订单状态
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
        phone : '',  //平台名称
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {

            case 'phone':
            label = '手机号';
            break;

            case 'createTimeDesc':
            label = '创建时间';
            break;

            case 'bizId':
            label = '订单编号';
            break;

            case 'statusDesc':
            label = '订单状态状态';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};