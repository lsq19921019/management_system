<template>
	<div class="supplierManager-page">
        <el-row style="margin-top:20px">
            <el-col :span="2" :offset=12>
                <add-dialog @updateData="getProvidername"></add-dialog>
            </el-col>
            <el-col :span="5">
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
				>
                <el-table-column
					prop="id"
					label="供应商ID"
					>
					<template slot-scope="scope">
						<p>{{scope.row.id}}</p>
					</template>
				</el-table-column>
				<el-table-column
					prop="providername"
					label="名称"
					>
					<template slot-scope="scope">
						<router-link :to="{path:'supplierDetail',query:{id:scope.row.id}}" class="providerNameLink">
							<p>{{scope.row.providername}}</p>
						</router-link>
					</template>
				</el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <router-link :to="{path:'supplierEdit',query:{id:scope.row.id}}" style="margin-right:10px">
                            <el-button
                                size="mini"
                                type="primary">编辑</el-button>
                        </router-link>
                        <router-link :to="{path:'supplierAdd_list',query:{providerid:scope.row.id,providername:scope.row.providername}}" style="margin-right:10px">
                            <el-button
                                size="mini"
                                type="success">资源列表</el-button>
                        </router-link>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
				
			</grid>    
        </el-row>
    </div>
</template>
<script>
import supplierManager from "./index.js";
export default supplierManager;
</script>
<style lang="scss" scoped>
.providerNameLink {
  color: #5a5e66;
}
</style>
