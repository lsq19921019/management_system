<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-意见反馈
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
    export default {
        name : 'OperationMangementFeedback',
        data() {
            let _this = this;
            return {
                //公共
                pubConfig : {
                    apiName : 'feedback',
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
                    showIndex : true,
                    thConfig : [
                        {
                            text : '反馈时间',
                            key : 'createTimeDesc'
                        },{
                            text : '注册手机号',
                            key : 'phone'
                        },{
                            text : '反馈标题',
                            key : 'title'
                        },{
                            text : '反馈内容',
                            key : 'content'
                        },{
                            text : '手机设备',
                            key : 'deviceBrand'
                        },{
                            text : '手机系统',
                            key : 'systemVersion'
                        },{
                            text : '客户端版本',
                            key : 'clientVersion'
                        },
                        {
                            text : '网络情况',
                            key : 'netType'
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
        },
        //生命周期-实例创建后
        created() {
            //获取当前页面模块配置
            this.getOperateConfig();
            //this.openDetail();
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

<style lang="scss" scoped>
    
</style>