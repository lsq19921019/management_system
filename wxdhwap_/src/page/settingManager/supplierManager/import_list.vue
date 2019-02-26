<template>
	<div class="list-add-page">
        <el-row style="margin-top:20px">
            <el-col :span="6"><span style="margin-left:20px;font-size:18px">{{providername}}</span></el-col>
            <el-col :offset=16>
                <add-dialog btnText="新增" 
                            btnType="primary" 
                            dialogTitle="新增" 
                            :providerid="providerid"
                            @updateData="getAddData" style="margin-right:10px"></add-dialog>
                <upload-dialog btnText="批量导入" 
                               :url="importUrl"
                               :providerid = "providerid"
                               style="margin-right:10px"
                               @uploadData="getUploadData"></upload-dialog>
                <el-button size="mini" type="danger" @click="clean('-1')">清空</el-button>
                <el-button size="mini" type="warning" @click="save">保存</el-button>
            </el-col>
        
        </el-row>
        <el-row>
            <grid
			    :defaultData="tableData"
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
					label="次条价"
          :formatter="secondpriceFormat">
				</el-table-column>
				<el-table-column
					prop="other"
					label="其他"
          :formatter="otherFormat">
				</el-table-column>
                <el-table-column
					prop="op"
					label="操作">
                    <template slot-scope="scope">
                        <add-dialog btnText="编辑" 
                                    btnType="default" 
                                    dialogTitle="编辑" 
                                    :id="scope.row.id" 
                                    :providerid="providerid" 
                                    :index="scope.$index"
                                    :info="scope.row" 
                                    @updateData="getUpdateData"></add-dialog>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="clean(scope.$index,tableData)">删除</el-button>
                    </template>
				</el-table-column>
                <el-table-column
					prop="exist"
                    :formatter="existFormat"  
					label="信息">
				</el-table-column>
			</grid>    
        </el-row>
    </div>
</template>
<script>
import import_list from "./import_list.js";
export default import_list;
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
.el-pagination{
    display: none!important;
}
</style>