<!--
    create : 田鹏伟 2019-02-19
    desc : 
-->
<template>
    <div style="padding:20px;">
        <!-- 表格&分页 -->
        <table-component :tableConfig="tableConfig" @getList="getList" :pubConfig="pubConfig" ref="myTable"></table-component>
    </div>
</template>

<script>
    import tableComponent from '@/pages/components/table';
    export default {
        data() {
            return {
                //公共
                pubConfig : {
                    apiName : 'channelCalculate',
                    subParam : {
                        channelName : this.$route.params.channelName
                    }
                },
                //公共-表格配置
                tableConfig : {
                    thConfig : [
                        {
                            text : '日期',
                            key : 'calculDateDesc'
                        },{
                            text : '渠道名称',
                            key : 'channelName'
                        },{
                            text : '今日注册用户数',
                            key : 'registerTotal'
                        },{
                            text : '今日注册且实名用户数', 
                            key : 'authTotal'
                        }
                    ],
                    showPagination : true,  //是否显示分页
                },
                channelName : this.$route.params.channelName
            }
        },
        created() {
            
        },
        components : {
            tableComponent
        },
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
        }
    }
</script>

<style scoped>

</style>