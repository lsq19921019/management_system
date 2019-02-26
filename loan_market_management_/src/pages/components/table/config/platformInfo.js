/**
 * create : 田鹏伟 2018-12-10
 * desc : 平台列表配置
 */
module.exports = {
    //校验规则
    check : {        
        platformName: [
            { required: true, message: '请输入平台名称', trigger: 'blur' }
        ],
        sort: [
            { required: true, message: '请输入平台排序', trigger: 'blur' }
        ],
        showIndex: [
            { required: true, message: '请选择是否首页推荐', trigger: 'change' }
        ],
        companyFullName: [
            { required: true, message: '机构所属公司全称', trigger: 'blur' }
        ],
        productDesc: [
            { required: true, message: '请输入一句话简介', trigger: 'blur' }
        ],
        productLogo: [
            { required: true, message: '请上传平台logo', trigger: 'blur' }
        ],
        minAmount: [
            { required: true, message: '请输入最低额度', trigger: 'blur' }
        ],
        maxAmount: [
            { required: true, message: '请输入最高额度', trigger: 'blur' }
        ],
        minTrem: [
            { required: true, message: '请输入最低期限', trigger: 'blur' }
        ],
        maxTrem: [
            { required: true, message: '请输入最高期限', trigger: 'blur' }
        ],
        highRate: [
            { required: true, message: '请输入参考日利率', trigger: 'blur' }
        ],
        fastLoanTime: [
            { required: true, message: '请输入最快放款时间', trigger: 'blur' }
        ],
        productUrl: [
            { required: true, message: '请输入注册链接', trigger: 'blur' }
        ],
        loanType: [
            { type: 'array', required: true, message: '请至少选择一种贷款类型', trigger: 'change' }
        ],
        platformNo: [
            { required: true, message: '请输入平台编号', trigger: 'blur' }
        ]
    },
    //搜索字段
    searchKeys : {
        startTime : '',  //开始时间
        endTime : '',  //结束时间
        platformName : '', //平台名称
        platformType : '',  //平台类型
        pfstatus : '',  //平台状态
    },
    //添加&修改涉及到的字段
    keys : {
        companyFullName : '',
        platformName : '', 
        sort : '',
        showIndex : '',
        productDesc : '',
        productLogo : '',
        minAmount : '',
        maxAmount : '',
        minTrem : '',
        maxTrem : '',
        highRate : '',
        fastLoanTime : '',
        productUrl : '',
        loanType : [],
        platformNo : ''
    },
    //表头配置
    initTh(key) {
        let label = false;
        switch(key) {
            
            case 'platformNo':
            label = '平台编号';
            break;

            case 'createTimeDesc':
            label = '创建时间';
            break;

            case 'platformName':
            label = '平台名称';
            break;

            // case 'tag':
            // label = '平台标签';
            // break;

            case 'loanType':
            label = '平台类型';
            break;

            case 'showIndexDesc':
            label = '首页推荐';
            break;

            case 'pfstatusDesc':
            label = '平台状态'; 
            break;

            case 'sort':
            label = '平台推荐号'; 
            break;
    
            default:
            label = false;
        }
        return label;
    }
};