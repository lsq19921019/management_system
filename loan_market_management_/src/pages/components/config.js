/**
 * create : 田鹏伟 2019-01-10
 * desc : 搜索字段配置 
 */

import {
    checkLength,  //检测长度
    kouLiangRate,  //推广渠道管理扣量比例校验
} from './rules';
module.exports = {
    //用户信息-用户列表
    userInfo : {
        //搜索字段
        searchKeys : {
            createTime : '',  //创建时间
            userName : '',  //用户名称
            userId : '' //用户id
        }
    },
    //平台信息管理-平台列表
    platformInfo : {
        searchKeys : {
            // startTime : '',  //开始时间
            // endTime : '',  //结束时间
            // platformName : '', //平台名称
            // platformType : '',  //平台类型
            // pfstatus : '',  //平台状态
        }
    },
    //运营管理-对接平台统计
    orderCalculate : {
        searchKeys : {
            platformName : '',  //平台名称
            startDate : '',  //开始日期
            endDate : '', //结束日期
        }
    },
    //运营管理-意见反馈
    feedback : {
        searchKeys : {
            startTime : '',
            endTime : ''
        }
    },
    //运营管理-平台公告
    sysNotice : {
        //表单字段
        formKeys : {
            releaseTimeDesc : '',
            content : '',
            title : ''
        },
        //表单校验规则
        rules : {
            content: [
                { required: true, message: '请输入公告内容', trigger: 'blur' }
            ],
            title: [
                { required: true, message: '请输入标题', trigger: 'blur' }
            ],
            releaseTimeDesc: [
                { required: true, message: '请编辑内容', trigger: 'blur' }
            ]
        }
    },
    //运营管理-联登平台推荐数据
    ulCalculate : {
        searchKeys : {},  //搜索字段
    },
    //运营管理-条款管理
    sysTerm : {
        formKeys : {
            sort : '',  //排序
            content : ''  //内容
        }
    },
    //运营管理-banner管理
    platformBanner : {
        formKeys : {
            url : '',  //链接地址
            imgUrl : '',  //图片链接
            orderNo : '',
            flag : '',  //是否启用
            type : '',  //类型
        },
        //表单校验规则
        rules : {
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
            ]
        }
    },
    //运营管理-banner统计

    //运营管理-轮播公告
    carouselNotice : {
        formKeys : {
            content : '',
            status : ''
        },
        rules : {
            content: [
                { required: true, message: '请输入公告内容', trigger: 'blur' }
            ],
            status: [
                { required: true, message: '请选择是否置顶', trigger: 'change' }
            ]
        }
    },
    //平台信息管理-平台列表
    platformInfo : {
        formKeys : {
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
        rules : {
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
        }
    },
    //运营管理-推广渠道管理
    channelConfig : {
        //表单字段
        formKeys : {
            channelName : '',
            allRegisterLimit : '',
            perRegisterLimit : '',
            remark : '',  
            deductionRate : ''          
        },
        placeholder : {
            channelName : '请填写渠道名称',
            allRegisterLimit : '请填写渠道累计注册上限，填“0”表示无上限',
            perRegisterLimit : '请填写渠道单日注册上限，填“0”表示无上限',
            remark : '请填写备注',  
            deductionRate : '请填写0-100的比例数值'
        },
        //表单校验规则
        rules : {
            channelName: [
                {required: true, validator: checkLength('渠道名称',30), trigger: 'blur' }
            ],
            allRegisterLimit: [
                { required: true, message: '请输入渠道累计注册上限', trigger: 'blur' }
            ],
            perRegisterLimit: [
                { required: true, message: '请输入渠道单日注册上限', trigger: 'blur' }
            ],
            remark: [
                { validator: checkLength('备注信息',30), trigger: 'blur' }
            ],
            deductionRate: [
                {required: true, validator: kouLiangRate('扣量比例'), trigger: 'blur' }
            ],
        }
    },

    /**
     * 
     * @param {object} row 表单行数据
     * @param {vm} _this vue实例
     */
    handlerModify(row,_this) {
        //row表格行数据对象
        return new Promise((resolve,reject)=>{
            //设置表单类型
            _this.formConfig.type = 2;            
            _this.formConfig.id = row.id; 
            let modifyRules = _this.formConfig.modify;
            if(_this.pubConfig.apiName == 'platformInfo') {
                if(row.platformType && row.platformType == 2) {  //联登平台
                    _this.formConfig.type = 22; 
                    modifyRules = _this.formConfig.modify2;
                } 
            }
                                  
            //显示表单
            _this.formConfig.isShow = true;
            _this.http(_this,{
                url : _this.pubConfig.apiName+'/detail',
                data : {
                    id : row.id
                }
            }).then(data=>{
                //设置表单的值
                let formKeys = _this.$refs.formCom.formKeys;
                if(_this.pubConfig.apiName == 'platformInfo') {
                    if(row.platformType && row.platformType == 2) {
                        _this.formConfig.type = 22; 
                        modifyRules = _this.formConfig.modify2;
                        formKeys.platformType = 2;
                    } else if(row.platformType == 1) {
                        formKeys.platformType = 1;
                    } else if(row.platformType == 3) {
                        formKeys.platformType = 3;
                    } 
                }
                
                //let formKeys = this[_this.pubConfig.apiname].formKeys;                
                console.log('编辑规则',modifyRules);
                let pks = _this.formConfig.modifyPkConfig;
                for(let k in formKeys) {
                    // formKeys[k] = data[k] || '';
                    for(let i=0; i<modifyRules.length; i++) {
                        let type = '';
                        if(modifyRules[i].field == k) type = modifyRules[i].type;
                        switch(type) {
                            case 'checkbox':
                            formKeys[k] = formKeys[k].split(',');
                            break;

                            case 'radio':
                            formKeys[k] = data[k];                            
                            break;

                            case 'select':
                            let selectArr = pks[k];
                            for(let i=0; i<selectArr.length; i++) {
                                if(selectArr[i].vkey == data[k]) { 
                                    //编辑的时候下拉框显示value，
                                    formKeys[k] = selectArr[i].value;
                                }
                            }
                            break;
                            
                            case 'richText':
                            _this.$refs.formCom.isShowRichText = true;
                            formKeys[k] = data[k];

                            case 'imgUpload':
                            _this.$refs.formCom.isShowImgUpload = true;
                            formKeys[k] = data[k];
                            
                            default:
                            formKeys[k] = data[k];
                        }
                    }
                }
                
            });
            
        });
    },
    /**
     * 表格操作事件-添加
     */
    handlerAdd(_this) {
        return new Promise((resolve,reject)=>{
            //设置表单类型
            _this.formConfig.type = 1;
            //显示表单
            _this.formConfig.isShow = true;
            _this.formConfig.id = ''; 
            let addRules = _this.formConfig.add;
            if(_this.pubConfig.apiName == 'platformInfo') {
                if(arguments[1] == 2) {
                    console.log(_this.formConfig.add2);
                    addRules = _this.formConfig['add'+arguments[1]];
                    _this.formConfig.type = 12;  //代表新增的是联登平台
                }
            }
            
            //等组件加载完毕
            setTimeout(_=>{
                //先清空表单数据
                let formKeys = _this.$refs.formCom.formKeys;                
                console.log('添加规则',addRules);
                for(let k in formKeys) {                
                    for(let i=0; i<addRules.length; i++) {
                        let type = '';
                        if(addRules[i].field == k) type = addRules[i].type;
                        switch(type) {
                            case 'checkbox':
                            formKeys[k] = [];
                            break;

                            case 'radio':
                            formKeys[k] = [];
                            break;
                            
                            case 'richText':
                            _this.$refs.formCom.isShowRichText = true;
                            formKeys[k] = '';

                            case 'imgUpload':
                            _this.$refs.formCom.isShowImgUpload = true;
                            formKeys[k] = '';

                            default:
                            formKeys[k] = '';
                        }
                    }
                }
                if(arguments[1] == 1) {
                    formKeys.platformType = 1;
                } else if(arguments[1] == 2) {
                    formKeys.platformType = 2;
                } else if(arguments[1] == 3) {
                    formKeys.platformType = 3;
                }
                if(_this.pubConfig.apiName == 'platformInfo') {                    
                    if(arguments[1] == 1) {
                        formKeys.platformType = 1;
                    } else if(arguments[1] == 2) {
                        formKeys.platformType = 2;
                    } else if(arguments[1] == 3) {
                        formKeys.platformType = 3;
                    }
                }
                
                resolve(0);
            },100);

        });
    },
    /**
     * 表格操作事件-删除
     */
    handlerDelete(row,_this) {
        return new Promise((resolve,reject)=>{
            _this.$confirm('此操作将永久删除所选项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.http(_this,{
                    url : _this.pubConfig.apiName+'/delete',
                    data : {
                        ids : row.id
                    }
                }).then(data=>{
                    _this.$message({
                        type: 'success',
                        message: '删除成功！'
                    });
                    //resolve(0); 
                    _this.$refs.myTable.getList(_this.searchData,1);
                });
            }).catch(() => {
                _this.$message({
                    type: 'info',
                    message: '已取消删除'
                });         
            });

            
        });
    }
};