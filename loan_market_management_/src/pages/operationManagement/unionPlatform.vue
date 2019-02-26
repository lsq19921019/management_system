<!--
    create : 田鹏伟 2018-11-21
    desc : 平台管理-联登平台推荐数据
-->
<template>
    <div class="_contain">
        <!-- <config-table :tableConfig="tableConfig"></config-table> -->
        暂无接口
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'OperationMangementUnionPlatform',
        data() {
            return {
                tableConfig : {
                    apiName : 'pvCalculate',  //接口地址
                    showSelection : false,
                    operate : false,
                    mainBtns : {
                        // refresh : '刷新'
                    },  //主要按钮组
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