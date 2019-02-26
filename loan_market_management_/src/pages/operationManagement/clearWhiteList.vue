<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-清除白名单账号
-->
<template>
    <div class="_contain">
        <!-- <config-table :tableConfig="tableConfig"></config-table> -->
        <!-- <div class="search">
            <div class="mt10 td">
                <el-input placeholder="请输入手机号" v-model="mobile">
                    <template slot="prepend">手机号</template> 
                </el-input>
            </div>
            <div class="mt10 td"><el-button type="primary" @click="search()" icon="el-icon-search">搜索</el-button></div>
        </div> -->
        <div class="mt15">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="value"
                label="手机号">
                </el-table-column>
                <!-- <el-table-column
                prop="exp"
                label="失效时间">
                </el-table-column>
                <el-table-column
                prop="type"
                label="缓存类型">
                </el-table-column> -->
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleOperate(scope.row)" type="text" size="small">清除信息</el-button>                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import configTable from '@/pages/components/table/main';
    export default {
        name : 'PlatformManagementBroadcastNotice',
        data() {
            return {
                tableConfig : {
                    apiName : 'carouselNotice',  //接口地址
                },
                mobile : '',
                tableData : [],
            }
        },
        components : {
            configTable
        },
        //自定义方法集合
        methods : {
            search() {
                this.getData({
                    value : this.mobile
                });
            },
            getData(obj) {
                let key = 'SYSTEM_WHITE_LIST';
                let param = {
                    pkeys : key
                };
                if(obj) {
                    param = Object.assign(param,obj);
                }
                this.http(this,{
                    url : 'dict/pkey',
                    data : param
                }).then(data=>{
                    this.tableData = data[key];
                });
            },
            handleOperate(row) {
                this.http(this,{
                    url : 'userInfo/remove',
                    data : {
                        phone : row.value
                    } 
                }).then(data=>{
                    this.$message({
                        message : '清除成功',
                        showClose : true,
                        type : 'success'
                    }); 
                    this.getData();
                });
            }
        },
        //生命周期-实例创建后
        created() {
            this.getData();
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