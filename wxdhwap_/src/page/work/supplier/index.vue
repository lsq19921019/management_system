<template>
	<div class="supplier-page">
        <el-row>
            <el-col :span="8">
                <span style="color:#5a5e66;font-size:14px;margin:0 10px">跟进人:</span>
				<el-select v-model="userId" placeholder="请选择" @change="changeUser" size="small" >
					<el-option
					v-for="item in userList"
					:key="item.userId"
					:label="item.username"
					:value="item.userId"
					>
					</el-option>
				</el-select>
            </el-col>
            <el-col :span="8" offset="8">
                <el-input
                placeholder="请输入代理商名称"
                size="small"
                v-model="providername">
                    <el-button slot="append" icon="el-icon-search" @click="searchProvider">搜索</el-button>
                </el-input>
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
					prop="providername"
					label="代理商"
					>
					<template slot-scope="scope">
						<router-link :to="{path:'supplierDetail',query:{id:scope.row.providerid}}" class="providerNameLink">
							<p>{{scope.row.providername}}</p>
						</router-link>
					</template>
				</el-table-column>
                <el-table-column
					prop="resourceNum"
					label="资源"
					>
					<template slot-scope="scope">
						<p>{{scope.row.resourceNum}}</p>
					</template>
				</el-table-column>
				<el-table-column
					prop="userName"
					label="跟进人"
					>
					<template slot-scope="scope">
						<p>{{scope.row.userName}}</p>
					</template>
				</el-table-column>
			</grid>    
        </el-row>                    
    </div>
</template>
<script>
	import supplier from './index.js';
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
.providerNameLink{
    color: #878d99;
    }
</style>