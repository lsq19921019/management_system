<!--
    create : 田鹏伟 2019-01-07
    desc : 数据表格&分页
-->
<template>
    <div class="mt15">
        <!-- 表格 -->
        <div>
            <el-table id="rebateSetTable" ref="myTable" border :data="tableData">
                <!-- 选择列 -->
                <!-- <el-table-column type="selection" v-if="defaultConfig.select"> </el-table-column> -->
                <!-- 是否显示索引 -->
                <el-table-column type="index" width="60" label="序号" v-if="tableConfig.showIndex"></el-table-column>
                <!-- 主要数据列 -->
                <el-table-column v-for="(th,index) in tableConfig.thConfig" :key="index" :label="th.text">
                    <template slot-scope="scope">
                        <div v-html="initTdType(scope.row,th,index)"></div>
                    </template>
                </el-table-column>
                
                <!-- 操作列 -->
                <el-table-column label="操作" v-if="tableConfig.showOpreate">
                    <template slot-scope="scope">
                        <el-button v-for="(btn,index) in tableConfig.operateBtnConfig" :key="index" type="text" size="small" @click="btn.fncName(scope.row)">{{ typeof btn.text == 'string' ? btn.text : btn.text(scope.row) }}</el-button>
                        <!-- <el-button type="text" size="small" @click="handleOperate('offLine',scope)" v-if="defaultConfig.operateConfigBtns.offLine">{{ scope.row.pfstatus==1 ? '下线':'上线' }}</el-button>
                        <el-button v-for="btn in defaultConfig.operateBtns" :key="btn.type" @click="handleOperate(btn.type,scope)" type="text" size="small">{{ btn.label }}</el-button> -->
                        
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="mt15" v-if="tableData.length > 0 && tableConfig.showPagination">
            <el-pagination
                background                
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.pageNum"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'Table',
        data() {
            return {
                //分页配置
                pagination : {
                    total : 100,  //总条数
                    pageSizes : [5,10,20,30,40,50],  //每页条数
                    pageSize : 10,
                    pages : 2,  //总页数
                    pageNum : 1,  //当前页码
                },
                tableData : []
            }
        },
        props : {
            pubConfig : {},
            tableConfig : {
                showIndex : false, //是否显示索引
                //表头配置
                thConfig : [
                    {
                        text : '真实姓名',  //表头描述
                        key : 'userName',  //该列对应的显示字段
                        hanlder(con) {  //表格内容处理函数
                            return `<span style="color:red;">${con}</span>`
                        }  
                    }
                ],
                showPagination : true,  //是否显示分页
                showOpreate : true,  //是否显示操作列
                operateBtnConfig : [
                    {
                        text : '详情',  //按钮文案
                        //供子元素调用的方法
                        fncName(row) {
                            console.log(row);    
                        },
                    }
                ],  //操作表格按钮配置
            }
        },
        created() {
            this.getList();
        },
        methods : {
            initTdType(row,th) {
                let con = row[th.key];
                if(th.hanlder) {
                    con = th.hanlder(con);
                }
                return con;
            },
            //修改分页尺寸
            handleSizeChange(val) {
                this.pagination.pageSize = val;
                this.pagination.pageNum = 1;
                this.getList();
            },
            //页码选择
            handleCurrentChange(val) {
                this.pagination.pageNum = val;
                this.getList();
            },
            //获取数据
            getList(searchData) {
                if(searchData) {
                    this.searchCondition = searchData;
                }
                //有第二个参数说明是重置
                if(arguments[1]) {
                    this.pagination.pageNum = 1;
                }
                let data = {
                    pageNum : this.pagination.pageNum,
                    pageSize : this.pagination.pageSize
                };
                Object.assign(data,this.searchCondition);
                if(this.pubConfig.subParam) Object.assign(data,this.pubConfig.subParam);
                this.http(this,{
                    url : `${this.pubConfig.apiName}/list`,
                    data
                }).then(data=>{
                    let list = data.list;
                    this.pagination.total = data.total;
                    this.pagination.pages = data.pages;
                    this.$emit('handlerOtherData',data);
                    if(list != null) {
                        this.tableData = list;
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

</style>