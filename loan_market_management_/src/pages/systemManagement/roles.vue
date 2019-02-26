<!--
    create : 田鹏伟 2018-11-20
    desc : 系统管理-角色管理
-->
<template>
    <div class="_contain">
        <!-- <config-table :tableConfig="tableConfig"></config-table> -->
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'systemManagementRoles',
        data() {
            return {
                title : '系统管理-角色管理',
                tableConfig : {
                    apiName : 'platformInfo',  //接口地址
                }
                // platformZone/list
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