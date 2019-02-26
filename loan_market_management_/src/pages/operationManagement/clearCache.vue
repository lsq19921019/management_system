<!--
    create : 田鹏伟 2018-11-21
    desc : 运营管理-清除缓存
-->
<template>
    <div class="_contain">
        <el-row :gutter="20">
            <el-col :span="3.5"><el-input placeholder="请输入redis的key" v-model="iptKey"></el-input></el-col>
            <el-col :span="3"><el-button type="primary" @click="handleOperate(iptKey,1)">清除</el-button></el-col>
        </el-row>
        <div class="mt15">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="value"
                label="描述">
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
                        <el-button @click="handleOperate(scope.row)" type="text" size="small">清除</el-button>                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'PlatformManagementBroadcastNotice',
        data() {
            return {
                tableData : [],
                iptKey : ''
            }
        },
        components : {
            
        },
        //自定义方法集合
        methods : {
            getData() {
                this.http(this,{
                    url : 'redisConfig/list'
                }).then(data=>{
                    this.tableData = data.list;
                });
            },
            handleOperate(row,type) {
                let key = row.key;
                if(type == 1) {
                    key = row;
                }
                this.http(this,{
                    url : 'redisConfig/delete',
                    data : {
                        key : key
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