/**
 * create : 田鹏伟 2018-12-10
 * desc : 运营管理-用户列表
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
        createTime : '',  //创建时间
        userName : '',  //用户名称
        userId : '' //用户id
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            case 'userId':
            label = 'UID';
            break;

            case 'createTimeDesc':
            label = '注册时间';
            break;

            case 'userPhone':
            label = '注册手机号';
            break;

            case 'userName':
            label = '真实姓名';
            break;

            case 'userIdcard':
            label = '身份证账号';
            break;

            case 'relation':
            label = '注册来源1';
            break;
            case 'sRelation':
            label = '注册来源2';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};