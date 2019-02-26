<!--
    create : 田鹏伟 2018-11-21
    desc : 平台管理-平台配置
-->
<template>
    <div class="_contain">
        <config-table :tableConfig="tableConfig"></config-table>
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'PlatformManagementConfiguration',
        data() {
            return {
                title : '平台管理-平台配置',
                tableConfig : {
                    apiName : 'platformConfig',  //接口地址
                }
            }
        },
        components : {
            configTable
        },
        //自定义方法集合
        methods : {
            //选中
            handleSelectionChange(val) {
                this.values.multipleSelection = val;
                console.log(val);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        //生命周期-实例创建后
        created() {
            this.http(this,{
                url : 'platformConfig/list'
            }).then(data=>{
                this.tableData = data.list;
            });
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