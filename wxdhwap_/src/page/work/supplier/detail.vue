<template>
	<div class="supplier-page">
        <el-row class="top-info">
            <el-col :span="12">
                <span class="top-info-strong">{{baseInfo.providername}}</span> 
                <base-dialog btnText="基础信息" 
						:baseInfo ="baseInfo" 
						@multiMarkID="getMultiMarkID"></base-dialog>

            </el-col>
            <el-col :span="4">
                跟进人：{{baseInfo.dockingpeople}}
            </el-col>
            <el-col :span="8">
                更新时间：{{baseInfo.updatetime}}
            </el-col>
        </el-row>     
        <el-row>
            <grid
			    :defaultData="tableData.list"
				:defaultTotal="total"
				style="width: 100%"
				@reload="reload"
                :pageIndex="pageIndex"
				:pageSize="pageSize"
				:sortName="sortName"
				:sortOrder="sortOrder"
				>
                <el-table-column
                    type="index"
                    label="序号"
                    width="100">
                </el-table-column>
				<el-table-column
					prop="date"
					label="微信名称"
					>
					<template slot-scope="scope">
						<router-link :to="{path:'wxDetail',query:{wechatId:scope.row.wechatname}}" class="wechatNameLink">
							<p>{{scope.row.wechatname}}</p>
						</router-link>
					</template>
				</el-table-column>
                <el-table-column
					prop="wechatno"
					label="微信号"
					>
				</el-table-column>
				<el-table-column
					prop="firstpriceFormat"
					label="头条价"
					sortable
                    :formatter="firstpriceFormat"
					>
				</el-table-column>
				<el-table-column
					prop="secondprice"
					label="次条价"
                    sortable>
				</el-table-column>
				<el-table-column
					prop="other"
					sortable
					label="其他">
				</el-table-column>
			</grid>    
        </el-row>                    
    </div>
</template>
<script>
	import supplier from './detail.js';
	export default supplier;
</script>
<style lang="scss" scoped>
.supplier-page{
    padding:30px;
    color:#878d99;
}
.top-info{
    line-height:50px;
    border-bottom:1px solid #f1f1f1;
}
.top-info-strong{
    font-size:26px;
    margin-right:30px;
}
.wechatNameLink{
    color: #5a5e66;
}
</style>