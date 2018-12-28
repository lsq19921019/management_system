<template>
	<section>
	    <!--工具条-->
    <el-form :inline="true" :model="searchForm" class="toolbar">
      <el-form-item>
        <el-button @click="add" type="success">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="" type="danger">删除</el-button>
      </el-form-item>
    </el-form>
    
		<!-- 列表 -->
	  <el-table :data="gridData" highlight-current-row v-loading="gridLoading" class="grid">
      <el-table-column label="ID" prop="name" >
      </el-table-column>
      <el-table-column label="委外机构名称" prop="mobileNumber">
      </el-table-column>
       <el-table-column label="当前费率" prop="name" >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="edit(scope.row)">查看/修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看修改弹框 -->
     <el-dialog title="委外机构资料修改" v-model="editFormDigVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px">
        <el-form-item label="机构名称">
          <el-input v-model="editForm.name" auto-complete="off"><template slot="append">%</template></el-input>
        </el-form-item>
        <el-form-item label="费率">
          <el-input v-model="editForm.name" auto-complete="off"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="editFormSubmit" :loading="confirmLoading">确 定</el-button>
        <el-button type="" @click="editFormDigVisible = false">取 消</el-button>
      </div>
    </el-dialog>
	</section>
</template>
<script>
	export default {
		data() {
			return {
				searchForm: {},
				gridData: [],
				gridLoading: false,
				editFormDigVisible: false,
				confirmLoading: false,
				editForm: {
					name: ''
				}

			}
		},
		methods: {
			edit() {},
			add() {},
			editFormSubmit() {}
		}
	}
</script>