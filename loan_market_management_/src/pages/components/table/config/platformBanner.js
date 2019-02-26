/**
 * create : 田鹏伟 2018-12-10
 * desc : 平台banner配置
 */
module.exports = {
    //校验规则
    check : {
        url: [
            { required: true, message: '请输入链接地址', trigger: 'blur' }
        ],
        //数字类型
        orderNo: [
            { required: true, message: '请输入排序序号', trigger: 'blur' }
        ],
        imgUrl : [
            { required: true, message: '请上传图片', trigger: 'change' }
        ],
        flag : [
            { required: true, message: '请选择启用/禁用', trigger: 'change' }
        ],
        type : [
            { required: true, message: '请选择类型', trigger: 'change' }
        ],
    },
    //需要展示的字段
    keys : {
        url : '',
        orderNo : '',
        imgUrl : '',
        flag : '',
        type : ''
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            case 'imgUrl':
            label = '图片';
            break;

            case 'url':
            label = '链接';
            break;

            case 'typeDesc':
            label = '类型';
            break;

            case 'flagDesc':
            label = '状态';
            break;
            
            default:
            label = false;
        }
        return label;
    }
};