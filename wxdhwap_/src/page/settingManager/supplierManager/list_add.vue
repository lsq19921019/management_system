<template>
	<div class="list-add-page">
        <el-row style="margin-top:20px">
            <el-col :span="6"><span style="margin-left:20px;font-size:18px">{{providerName}}</span></el-col>
            <el-col :span="2" :offset=10>
                <router-link :to="{path:'import_list',query:{providerid:providerid,providername:providerName}}" style="margin-top:10px;">
                    <el-button size="mini" type="primary">新增</el-button>
                    <!-- <add-dialog btnText="新增" btnType="primary" dialogTitle="新增" @updateData="getUpdateData"></add-dialog> -->
                </router-link>
            </el-col>
            <el-col :span="6">
                <el-input
                placeholder="请输入微信名或者微信号"
                size="small"
                v-model="wechatname">
                    <el-button slot="append" @click="searchProvider">搜索</el-button>
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
					prop="firstprice"
					label="头条价"
                    :formatter="firstpriceFormat">
				</el-table-column>
				<el-table-column
					prop="secondprice"
					label="次条价">
				</el-table-column>
				<el-table-column
					prop="other"
					label="其他">
				</el-table-column>
                <el-table-column
					prop="op"
					label="操作">
                    <template slot-scope="scope">
                        <edit-dialog btnText="编辑" 
                                     btnType="default" 
                                     dialogTitle="编辑" 
                                     :id="scope.row.id" 
                                     :wechatno="scope.row.wechatno"
                                     :info="scope.row"
                                     @updateData="getUpdateData"></edit-dialog>
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
import list_add from "./list_add.js";
export default list_add;
</script>
<style lang="scss" scoped>
.supplier-page {
  padding: 30px;
  color: #878d99;
}
.top-info {
  line-height: 50px;
  border-bottom: 1px solid #f1f1f1;
}
.top-info-strong {
  font-size: 26px;
  margin-right: 30px;
}
.wechatNameLink {
  color: #5a5e66;
}
</style>