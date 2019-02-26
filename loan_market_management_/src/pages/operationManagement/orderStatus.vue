<!--
    create : 田鹏伟 2018-12-28
    desc : 运营管理-订单状态
-->
<template>
    <div class="_contain">
        <!-- 条件查询组件-->
        <search-component :pubConfig="pubConfig" :subConfig="searchConfig" @search="getList" v-if="isShowSearchComponent"></search-component>    
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
    </div>
</template>

<script>
    import searchComponent from '@/pages/components/search';
    import tableComponent from '@/pages/components/table';
    import externalConfig from '@/pages/components/config';
    export default {
        name : 'OperationMangementOrderStatus',
        data() {
            return {
                //公共
                pubConfig : {
                    apiName : 'orderStatus',
                },
                //公共-传递给子组件的数据
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
                    fliterBtnConfig : [],
                    fliterChildData : {},  //搜索查询中需要用到的字典数据（下拉框项、单选框项）
                },
                //公共-是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : '平台名称',
                            key : 'platformName'
                        },{
                            text : '订单编号',
                            key : 'bizId'
                        },{
                            text : '手机号',
                            key : 'phone'
                        },{
                            text : '创建时间',
                            key : 'createTimeDesc'
                        },{
                            text : '订单状态',
                            key : 'statusDesc'
                        }
                    ],
                    showOpreate : false,  //是否显示操作列
                    showPagination : true,  //是否显示分页
                },
                searchData : {},  //搜索条件
            }
        },
        components : {
            searchComponent,tableComponent
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
                                    _this.isShowForm = true;
                                }
                                //如果有修改
                                if(_this.formConfig.modify) {
                                    _this.isShowForm = true;
                                    _this.formConfig.modify = data.modify;
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
                            //如果有修改
                            if(_this.formConfig.modify) {
                                pks = pks.concat(_this.formConfig.modify);
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
                                    pks = pks.concat(_this.formConfig.add);
                                    _this.formConfig.addPkConfig = fliterChildData;
                                }
                                //如果有修改
                                if(_this.formConfig.modify) {
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
            changeStatus(scope) {
                this.http(this,{
                    url : 'orderStatus/modify',
                    data : {
                        orderNo : scope.row.bizId,
                        status : scope.row.status
                    }
                }).then(data=>{
                    this.$refs.table.getData();
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