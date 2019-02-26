<template>
	<div class="msgManager-page">
		<ul class="header">
			<li>
				<el-button @click="dialogVisible = true">新增</el-button>
			</li>
		</ul>
		<el-table
			:data="tableData"
			style="width: 800px"
		>
			<el-table-column
				prop="roleName"
		        label="角色"
			>
			</el-table-column>
			<el-table-column
		        label="操作"
		        width="300"
			>
                <template slot-scope="scope">
                    <router-link :to="{path:'assignPermissions',query:{roleId:scope.row.roleId}}">
                        <el-button type="primary" size="small">权限</el-button>
                    </router-link>
                    <el-button @click="editClick(scope.row)" type="success" size="small" style="margin-left:10px">编辑</el-button>
                    <el-button type="danger" size="small" @click="deleteRow(scope.$index, tableData)">删除</el-button>
                </template>
			</el-table-column>
		</el-table>
        <el-dialog 
			:visible.sync="dialogVisible"
        >
        	<add-model  @refreshList="init" type="add" @closeWindow="dialogVisible = false"></add-model>
        </el-dialog>
        <el-dialog
			:visible.sync="updateDialogVisible"	
        >
        	<add-model :id="update"  @refreshList="init" type="update" @closeWindow="updateDialogVisible = false"></add-model>
        </el-dialog>
	</div>
</template>
<script>
import roleManager from "./index.js";
export default roleManager;
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  overflow: hidden;
  align-items: center;
  li {
    margin-left: 25px;
  }
}
.mouse {
  cursor: pointer;
}
</style>
