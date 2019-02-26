/**
 * create : 田鹏伟 2018-12-10
 * desc : 运营管理-平台点击数据
 */
module.exports = {
    //校验规则
    check : {
        platformName: [
            { required: true, message: '请输入平台名称', trigger: 'change' }
        ],
        orderNo: [
            { required: true, message: '请输入平台推荐编号', trigger: 'change' }
        ]
    },
    //需要展示的字段
    keys : {
        platformName : '',  //平台编号
        orderNo : '',  //平台推荐编号,
    },
    //搜索字段
    searchKeys : {
        platformName : '',  //平台名称
        status : '',  //平台状态
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            // case 'statusDesc':
            // label = '状态';
            // break;

            case 'createTimeDesc':
            label = '时间';
            break;

            case 'platformName':
            label = '平台名称';
            break;

            case 'orderNo':
            label = '专区排序';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};