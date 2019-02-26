<template>
    <div class="detail-info-con">
        <p class="detail-title">记录</p>
        <div class="info-box">
            <el-table
                :data="recordData.list"
                style="width: 100%">
                <el-table-column
                    prop="operation"
                    label=""
                    >
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label=""
                >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="">
                </el-table-column>
            </el-table>
            <el-pagination 
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="1"
				:page-sizes="[10, 20, 30, 40]"
				:page-size="10"
				layout="total, sizes, prev, pager, next, jumper"
				:total="recordData.total"
				style="margin-top:50px"
				>
		    </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props:['recordData'],
    data() {
        return {

        }
    },
    mounted(){
    },
    methods:{
        handleSizeChange(val) {
			this.$emit("paginationPageSize",`${val}`);
        },
        handleCurrentChange(val) {
            this.$emit("paginationCurrentPage",`${val}`);
        },
    }
}
</script>
<style lang="scss" scoped>
.detail-info-con{
    width: 970px;
    margin-left: 30px;
}
.detail-title{
    font-weight: bold;
    font-size: 15px;
    color: #5a5e66;
    padding: 20px 30px;
}
.info-box{
    border: 1px solid #ccc;
    border-radius: 3px;
}
.info-box-style{
    color: #5a5e66;
    padding: 10px 30px;
    font-size: 14px;
}
</style>