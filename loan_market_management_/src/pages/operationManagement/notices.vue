<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-平台公告
-->
<template>
    <div class="_contain">
        <!-- 条件查询组件-->
        <search-component :pubConfig="pubConfig" :subConfig="searchConfig" @search="getList" v-if="isShowSearchComponent"></search-component>   
        <!-- 副按钮 -->
        <sub-btns :subBtnsConfig="subBtnsConfig"></sub-btns>     
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
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
        name : 'OperationMangementUserNotics',
        data() {
            let _this = this;
            return {
                //公共
                pubConfig : {
                    apiName : 'sysNotice',
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
                //副按钮组配置
                subBtnsConfig : [
                    {
                        icon : 'el-icon-circle-plus-outline',  //图标
                        text : '添加',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            externalConfig.handlerAdd(_this).then(data=>{});
                        },
                    }
                ],
                //公共-是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : 'ID',
                            key : 'id'
                        },{
                            text : '标题',
                            key : 'title'
                        },{
                            text : '发布时间',
                            key : 'releaseTimeDesc'
                        }
                    ],
                    showOpreate : true,  //是否显示操作列
                    operateBtnConfig : [
                        {
                            text : '编辑',  //按钮文案
                            //供子元素调用的方法
                            fncName(row) {
                                externalConfig.handlerModify(row,_this).then(data=>{}); 
                            },
                        },
                        {
                            text : '删除',  //按钮文案
                            //供子元素调用的方法
                            fncName(row) {
                                externalConfig.handlerDelete(row,_this).then(data=>{
                                }); 
                            },
                        }
                    ],
                    showPagination : true,  //是否显示分页
                },
                searchData : {},  //搜索条件
                //公共-表单配置
                formConfig : {
                    id : '',  //待编辑的id
                    add : [],  //新增配置
                    modify : [],  //修改配置
                    isShow : false,  //是否显示表单
                    type : 1,  //类型 1添加 2修改
                    handlerShow() {
                        _this.formConfig.isShow = !_this.formConfig.isShow;
                    }
                },
                isShowForm : false,  //是否显示表单组件
               
            }
        },
        components : {
            searchComponent,tableComponent,subBtns,formComponent
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
                        let fliters = _this.searchConfig.fliters;
                        let fliterChildData = _this.searchConfig.fliterChildData;
                        let arr = [];
                        for(let i=0; i<fliters.length; i++) {
                            if(fliters[i].dict != null && fliters[i].dict.length > 0) {
                                arr.push(fliters[i].dict);
                                fliterChildData[fliters[i].field] = null;
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
            //私有方法
            add() {
                //设置表单类型添加
                this.formConfig.type = 1;
                //显示表单
                this.formConfig.isShow = true;
            },
            //编辑
            modify(row) {
               //设置表单类型编辑
                this.formConfig.type = 2;
                console.log('待编辑的数据',row);
                //显示表单
                this.formConfig.isShow = true; 

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