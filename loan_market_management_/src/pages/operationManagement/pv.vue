<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-平台点击数据
    config : pvCalculate.js
-->
<template>
    <div class="_contain">
        <config-table :tableConfig="tableConfig"></config-table>
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'OperationMangementPv',
        data() {
            return {
                tableConfig : {
                    apiName : 'pvCalculate',  //接口地址
                    subParam : {
                        channel : 1
                    },
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