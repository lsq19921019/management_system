<!--
    create : 田鹏伟 2018-11-21
    modify : 田鹏伟 2019-01-07 v1.3-定制开发
    desc : 平台管理-平台列表
-->
<template>
    <div class="_contain">
        <!-- 条件查询组件-->
        <search-component :pubConfig="pubConfig" :subConfig="searchConfig" @search="getList" @clearCach="clearCach" v-if="isShowSearchComponent"></search-component>
        <!-- 副按钮 -->
        <sub-btns :subBtnsConfig="subBtnsConfig"></sub-btns>
        <!-- <div class="mt10">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(1)">新增H5平台</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(2)">新增联登平台</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(3)">新增全流程平台</el-button>
        </div>   -->
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
        <!-- 表单 -->
        <!-- 表单 -->
        <form-component v-if="formConfig.isShow" :pubConfig="pubConfig" :config="formConfig" ref="formCom" @getList="getList" :searchData="searchData"></form-component>
    </div>
</template>

<script>
    import searchComponent from '@/pages/components/search';
    import subBtns from '@/pages/components/subBtns';
    import tableComponent from '@/pages/components/table';
    import formComponent from '@/pages/components/form';
    import externalConfig from '@/pages/components/config';
    export default {
        name : 'PlatformManagementList',
        data() {
            let _this = this;
            return {
                pubConfig : {
                    apiName : 'platformInfo',
                },
                //传递给子组件的数据
                searchConfig : {
                    //后端返回的搜索规则
                    fliters : [
                    //    {
                    //        field : 'platformName',  //字段
                    //        type : 'datetime',  //搜索组件类型
                    //        editable : true,  //是否可用（用于权限判断）
                    //    } 
                    ], 
                    //搜索组件额外的按钮配置
                    fliterBtnConfig : [
                        
                    ],
                    fliterChildData : {},  //搜索查询中需要用到的字典数据（下拉框项、单选框项）
                },
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : '平台编号',
                            key : 'platformNo'
                        },{
                            text : '创建时间',
                            key : 'createTimeDesc'
                        },{
                            text : '平台名称',
                            key : 'platformName'
                        },{
                            text : '平台类型',
                            key : 'platformTypeDesc'
                        },{
                            text : '首页推荐',
                            key : 'showIndexDesc'
                        },{
                            text : '平台排序',
                            key : 'sort'
                        },{
                            text : '状态',
                            key : 'pfstatusDesc'
                        }
                    ],
                    showPagination : true,  //是否显示分页 
                    showOpreate : true,  //是否显示操作列
                    operateBtnConfig : [
                        {
                            text(row) {
                                return row.pfstatus == 1 ? '下线':'上线'
                            },  //按钮文案
                            //供子元素调用的方法
                            fncName(row) {
                                _this.offLine(row);
                                return ''; 
                            },
                        },
                        {
                            text : '编辑',  //按钮文案
                            fncName(row) {
                                externalConfig.handlerModify(row,_this).then(data=>{}); 
                            },
                            //供子元素调用的方法
                            // fncName(row) {
                            //     _this.modify(row); 
                            // },
                        }
                    ]
                },
                //副按钮组配置
                subBtnsConfig : [
                    {
                        icon : 'el-icon-circle-plus-outline',  //图标
                        text : '新增H5平台',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            externalConfig.handlerAdd(_this,1).then(data=>{});
                        },
                    },
                    {
                        icon : 'el-icon-circle-plus-outline',  //图标
                        text : '新增联登平台',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            externalConfig.handlerAdd(_this,2).then(data=>{});
                        },
                    },
                    {
                        type : 'danger',  //类型
                        icon : 'el-icon-warning',  //图标
                        method : '',  //方法名
                        text : '清空缓存',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            _this.clearCach();
                        },
                    }
                ],
                //公共-表单配置
                formConfig : {
                    id : '',  //待编辑的id
                    add : [],  //新增H5平台
                    add2 : [],  //新增联登平台
                    addPkConfig : {},  //添加时字典查出的表单控件数据（select、radio、checkbox）
                    modifyPkData : {},  //修改时字典查出的表单控件数据
                    modify : [],  //修改联登平台
                    modify2 : [],  //编辑联登平台
                    addPkConfig2 : {},  //添加时字典查出的表单控件数据（select、radio、checkbox）
                    modifyPkData2 : {},  //修改时字典查出的表单控件数据
                    isShow : false,  //是否显示表单
                    type : 1,  //类型 1添加 2修改
                    handlerShow() {
                        _this.formConfig.isShow = !_this.formConfig.isShow;
                    },
                    labelWidth : '160px'
                },
                //搜索子组件传递过来的条件
                searchData : {},                
                //是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                
                //表格数据
                tableData : []
                
            }
        },
        components : {
            searchComponent, subBtns, tableComponent, formComponent
        },
        //自定义方法集合
        methods : {
            //模板公用方法
            public() {
                let _this = this;
                return {
                    //获取当前页面模块（搜索组件、表单组件）配置
                    getOperateConfig() {
                        _this.http(_this,{
                            url : 'operateConfig/operates',
                            data : {
                                module : _this.pubConfig.apiName
                            }
                        }).then(data=>{
                            //设置搜索子组件规则
                            let fliters = data.fliters;
                            _this.searchConfig.fliters = fliters;
                            //如果该模块有表单
                            if(_this.formConfig) {
                                //如果有新增
                                if(_this.formConfig.add) {
                                    _this.formConfig.add = data.add;
                                }
                                //如果有修改
                                if(_this.formConfig.modify) {
                                    _this.formConfig.modify = data.modify;
                                }
                                //如果有新增
                                if(_this.formConfig.add2) {
                                    _this.formConfig.add2 = data.add2;
                                }
                                //如果有修改
                                if(_this.formConfig.modify2) {
                                    _this.formConfig.modify2 = data.modify2;
                                }
                            }
                            _this.public().getKeys();                    
                        });
                    },
                    //获取子组件需要用到的字典数据
                    getKeys() {
                        let pks = [] ;                        
                        let arr = [];
                        let fliterChildData = {};
                        if(_this.searchConfig) {
                            pks = [..._this.searchConfig.fliters];
                        }
                        console.log(pks);
                        //如果该模块有表单
                        if(_this.formConfig) {
                            //如果有新增
                            if(_this.formConfig.add) {
                                pks = pks.concat(_this.formConfig.add);
                            }
                            //如果有新增
                            if(_this.formConfig.add2) {
                                pks = pks.concat(_this.formConfig.add2);
                            }
                            //如果有修改
                            if(_this.formConfig.modify) {
                                pks = pks.concat(_this.formConfig.modify);
                            }
                            //如果有修改
                            if(_this.formConfig.modify2) {
                                pks = pks.concat(_this.formConfig.modify2);
                            }
                        }
                        for(let i=0; i<pks.length; i++) {
                            if(pks[i].dict != null && pks[i].dict.length > 0) {
                                if(arr.indexOf(pks[i].dict) < 0) {
                                    arr.push(pks[i].dict);
                                }
                                fliterChildData[pks[i].field] = null;
                            }
                        }
                        if(arr.length < 1) {
                            _this.isShowSearchComponent = true;
                            return;
                        };
                        _this.http(_this,{
                            url : 'dict/pkey',
                            data : {
                                pkeys : arr.join(',')
                            }
                        }).then(data=>{
                            //new RegExp(n,'i').test(k.replace(/_/g,''))
                            //console.log(data);
                            for(let k in fliterChildData) {
                                for(let n in data) {
                                    if(new RegExp(k,'i').test(n.replace(/_/g,''))) {
                                        fliterChildData[k] = data[n]
                                    }
                                }
                            }
                            //如果该模块有表单
                            if(_this.formConfig) {
                                //如果有新增
                                if(_this.formConfig.add) {
                                    _this.formConfig.addPkConfig = fliterChildData;
                                }
                                if(_this.formConfig.add2) {
                                    _this.formConfig.addPkConfig = fliterChildData;
                                }
                                
                                //如果有修改
                                if(_this.formConfig.modify) {
                                    _this.formConfig.modifyPkConfig = fliterChildData;
                                }  
                                //如果有修改
                                if(_this.formConfig.modify2) {
                                    _this.formConfig.modifyPkConfig = fliterChildData;
                                }                              
                            }
                            //如果有查询
                            if(_this.searchConfig) {                                
                                _this.searchConfig.fliterChildData = fliterChildData;
                            }
                            _this.isShowSearchComponent = true;
                        })
                    }
                }
            },
            //获取数据
            getList(searchData,type) {
                let o = {};
                if(searchData) {
                    o = searchData;
                    if(this.searchData) this.searchData = searchData;
                }
                this.$refs.myTable.getList(o,type);
            },
            //上下线
            offLine(row) {
                this.http(this,{
                    url : 'platformInfo/addOrUpdate',
                    data : {
                        id : row.id,
                        pfstatus : row.pfstatus==1? 2 : 1
                    }
                }).then(data=>{
                    if(data) {
                        this.$message({
                            message : '操作成功',
                            showClose : true,
                            type : 'success'   
                        });
                        //下线成功刷新列表
                        this.$refs.myTable.getList(this.searchData)
                    } else {
                        this.$message({
                            message : '操作失败',
                            showClose : true,
                            type : 'error'   
                        })
                    }
                });
            },
            //清除缓存
            clearCach() {
                this.http(this,{
                    url : 'redisConfig/delete',
                    data : {
                        key : 'pf.t.l.l'
                    } 
                }).then(data=>{
                    this.$message({
                        message : '清除成功',
                        showClose : true,
                        type : 'success'
                    }); 
                });
            }
        },
        //生命周期-实例创建后
        created() {
            //获取当前页面模块配置
            this.public().getOperateConfig();
            
        },
        //生命周期-ui渲染前
        beforeMount() {
            
        },
        //生命周期-ui渲染结束
        mounted() {
            
        },
        //生命周期-组件销毁前
        beforeDestroy() {

        },
        //生命周期-组件销毁后
        destroyed() {
            
        }
    }
</script>

<style scoped>

</style>