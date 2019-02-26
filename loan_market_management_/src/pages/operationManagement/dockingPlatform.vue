<!--
    create : 田鹏伟 2018-12-28
    desc : 运营管理-对接平台统计
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
        name : 'OperationMangementDockingPlatform',
        data() {
            return {
                //公共
                pubConfig : {
                    apiName : 'orderCalculate',
                },
                //公共-传递给子组件的数据
                searchConfig : {
                    fliters : [], 
                    fliterBtnConfig : [],
                    fliterChildData : {}
                },
                //公共-是否显示(搜索)子组件（当异步执行完毕时候更改值）
                isShowSearchComponent : false,
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : '日期',
                            key : 'calculDateDesc'
                        },
                        {
                            text : '平台名称',
                            key : 'platformName'
                        },{
                            text : '一推单数',
                            key : 'onePushTotal'
                        },
                        // {
                        //     text : '一推待推送单数', 
                        //     key : 'onePushWaitTotal'
                        // },
                        {
                            text : '一推成功单数',
                            key : 'onePushSuccessTotal'
                        },{
                            text : '二推待推送单数',
                            key : 'twoPushWaitTotal'
                        },{
                            text : '二推成功单数',
                            key : 'twoPushSuccessTotal'
                        },{
                            text : '绑卡成功单数',
                            key : 'bindCardSuccessTotal'
                        },{
                            text : '待审核单数',
                            key : 'toAuditNowTotal'
                        },{
                            text : '审核通过单数',
                            key : 'passAuditNowTotal'
                        },{
                            text : '审核拒绝单数',
                            key : 'refusedAuditNowTotal'
                        },{
                            text : '用款确认成功单数',
                            key : 'withSuccessTotal'
                        },{
                            text : '放款成功单数',
                            key : 'loanSuccessTotal'
                        },{
                            text : '审核通过金额',
                            key : 'passAuditAmountTotal'
                        },{
                            text : '放款金额',
                            key : 'loanAmountTotal'
                        },{
                            text : '放款金额',
                            key : 'loanAmountTotal'
                        },{
                            text : '待审核单数（不依赖绑卡）',
                            key : 'toAuditTotal'
                        },{
                            text : '审核通过数（不依赖绑卡）',
                            key : 'passAuditTotal'
                        },{
                            text : '审核拒绝单数（不依赖绑卡）',
                            key : 'refusedAuditTotal'
                        }
                    ],
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
            //获取数据
            getList(searchData,type) {
                let o = {};
                if(searchData) {
                    o = searchData;
                    if(this.searchData) this.searchData = searchData;
                }
                this.$refs.myTable.getList(o,type);
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
        },
        //生命周期-实例创建后
        created() {
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