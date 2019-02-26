<!--
    create : 田鹏伟 2018-11-21
    desc : 平台管理-平台管理
-->
<template>
    <div class="_contain">
        <config-table :tableConfig="tableConfig"></config-table>
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'PlatformManagementManage',
        data() {
            return {
                title : '平台管理-平台列表',
                tableConfig : {
                    apiName : 'platformInfo',  //接口地址
                }
            }
        },
        components : {
            configTable
        },
        //自定义方法集合
        methods : {
            
        },
        //生命周期-实例创建后
        created() {

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