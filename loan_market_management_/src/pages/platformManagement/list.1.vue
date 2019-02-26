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
        <div class="mt10">
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(1)">新增H5平台</el-button>
            <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(2)">新增联登平台</el-button>
            <!-- <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addPlatform(3)">新增全流程平台</el-button> -->
        </div>  
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
        <!-- 表单 -->
        <platform-list-form ref="form" @getList="getList" :pubConfig="pubConfig"></platform-list-form>
    </div>
</template>

<script>
    import searchComponent from '@/pages/components/search';
    import platformListForm from '@/pages/components/platformListForm';
    import tableComponent from '@/pages/components/table';
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
                            key : 'loanType'
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
                            //供子元素调用的方法
                            fncName(row) {
                                _this.modify(row); 
                            },
                        }
                    ]
                },
                //搜索子组件传递过来的条件
                searchCondition : {},                
                //是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //分页配置
                pagination : {
                    total : 100,  //总条数
                    pageSizes : [5,10,20,30,40,50],  //每页条数
                    pageSize : 10,
                    pages : 2,  //总页数
                    pageNum : 1,  //当前页码
                },
                //表格数据
                tableData : []
                
            }
        },
        components : {
            searchComponent, platformListForm, tableComponent
        },
        //自定义方法集合
        methods : {
            //获取当前页面模块配置
            getOperateConfig() {
                this.http(this,{
                    url : 'operateConfig/operates',
                    data : {
                        module : this.pubConfig.apiName
                    }
                }).then(data=>{
                    //设置搜索子组件规则
                    let fliters = data.fliters;
                    this.searchConfig.fliters = fliters;
                    this.getKeys(fliters);                    
                });
            },
            //获取子组件需要用到的字典数据
            getKeys() {
                let fliters = this.searchConfig.fliters;
                let fliterChildData = this.searchConfig.fliterChildData;
                let arr = [];
                for(let i=0; i<fliters.length; i++) {
                    if(fliters[i].dict != null && fliters[i].dict.length > 0) {
                        arr.push(fliters[i].dict);
                        fliterChildData[fliters[i].field] = null;
                    }
                }
                if(arr.length < 1) {
                    this.isShowSearchComponent = true;
                    return;
                };
                this.http(this,{
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
                    this.isShowSearchComponent = true;
                })
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
            },
            //新增方法
            addPlatform(platformType) { 
                let formType = '';  
                let operateType = 'add';             
                if(platformType == 1) {
                    formType = '新增H5平台';
                } else if(platformType == 2){
                    formType = '新增联登平台';
                } else if(platformType == 3) {
                    formType = '新增全流程平台';
                }
                this.$refs.form.showForm({formType,platformType,operateType});
            },
            //编辑
            modify(row) {
                let formType = '编辑'; 
                let operateType = 'modify';
                this.$refs.form.showForm({formType,row,operateType});
            }
        },
        //生命周期-实例创建后
        created() {
            //获取当前页面模块配置
            this.getOperateConfig();
            
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