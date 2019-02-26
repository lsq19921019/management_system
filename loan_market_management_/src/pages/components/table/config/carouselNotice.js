/**
 * create : 田鹏伟 2018-12-10
 * desc : 轮播公告
 */
module.exports = {
    //校验规则
    check : {
        content: [
            { required: true, message: '请输入公告内容', trigger: 'blur' }
        ],
        status: [
            { required: true, message: '请选择是否置顶', trigger: 'change' }
        ]
    },
    //需要展示的字段
    keys : {
        content : '',  //内容
        status : '',  //状态-单选框
    },
    //搜索字段
    searchKeys : {
        content : '',  //内容
        endTime : '',  //结束时间
        startTime : '',  //开始时间
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            case 'content':
            label = '公告内容';
            break;

            case 'createTimeDesc':
            label = '创建时间';
            break;

            case 'statusDesc':
            label = '是否置顶';
            break;
    
            default:
            label = false;
        }
        return label;
    }
};