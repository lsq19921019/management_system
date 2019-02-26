<!--
    create : 田鹏伟 2018-11-21
    desc : 平台管理-平台专区
-->
<template>
    <div class="_contain">
        <config-table :tableConfig="tableConfig"></config-table>
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'PlatformManagementBasicConfiguration',
        data() {
            let _this = this;
            return {
                tableConfig : {
                    apiName : 'platformZone',  //接口地址                    
                }
            }
        },
        components : {
            configTable
        },
        //自定义方法集合
        methods : {
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