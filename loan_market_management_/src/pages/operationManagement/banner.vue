<!--
    create : 田鹏伟 2018-11-21
    desc : 平台管理-Banner
-->
<template>
    <div class="_contain"> 
        <!-- 副按钮 -->
        <sub-btns :subBtnsConfig="subBtnsConfig"></sub-btns>     
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
        <!-- 表单 -->
        <form-component v-if="formConfig.isShow" :pubConfig="pubConfig" :config="formConfig" ref="formCom" @getList="getList" :searchData="searchData"></form-component>
    </div>
</template>

<script>
    import subBtns from '@/pages/components/subBtns';
    import tableComponent from '@/pages/components/table';
    import formComponent from '@/pages/components/form';
    import externalConfig from '@/pages/components/config';
    //key : 'pf.b.l'
    export default {
        name : 'PlatformManagementBasicConfiguration',
        data() {
            let _this = this;
            return {
                //公共
                pubConfig : {
                    apiName : 'platformBanner',
                },
                //公共-传递给子组件的数据
                
                //副按钮组配置
                subBtnsConfig : [
                    {
                        icon : 'el-icon-circle-plus-outline',  //图标
                        text : '添加',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            externalConfig.handlerAdd(_this).then(data=>{});
                        },
                    },{
                        type : 'danger',
                        icon : 'el-icon-warning',  //图标
                        text : '清空缓存',  //按钮文案
                        //供子元素调用的方法
                        fncName() {
                            _this.clearCach();
                        },
                    }
                ],
                //公共-是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : '序号',
                            key : 'orderNo'
                        },{
                            text : '链接',
                            key : 'url'
                        },{
                            text : '图片',
                            key : 'imgUrl',
                            hanlder(con) {
                                return '<img style="width:100%;" src="'+ con +'"/>';
                            }
                        },{
                            text : '状态',
                            key : 'flagDesc'
                        },{
                            text : '类型',
                            key : 'typeDesc'
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
                    },
                    addPkConfig : {},  //添加时字典查出的表单控件数据（select、radio、checkbox）
                    modifyPkData : {},  //修改时字典查出的表单控件数据
                },
                isShowForm : false,  //是否显示表单组件
            }
        },
        components : {
            tableComponent,subBtns,formComponent
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
                            //如果有搜索组件 设置搜索子组件规则
                            if(_this.searchConfig) {
                                _this.searchConfig.fliters = data.fliters;
                            }
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
                        console.log(pks);
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

            },
            //清除缓存
            clearCach() {
                this.http(this,{
                    url : 'redisConfig/delete',
                    data : {
                        key : 'pf.b.l'
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