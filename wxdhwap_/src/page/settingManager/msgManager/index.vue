<template>
	<div class="msgManager-page">
		<ul class="header">
			<li>
				<span>排序：</span>
				<span class="mouse" @click="desc">
					<el-tag>倒序</el-tag>
				</span>
				<span class="mouse" @click="asc">
					<el-tag >正序</el-tag>
				</span>
			</li>
			<li>
				<el-select @change="roleChange" v-model="valueRole" placeholder="全部">
					<el-option
					v-for="item in options" 
					:label="item.roleName"
					:value="item.roleId"
					:key="item.roleId"
					></el-option>
				</el-select>
			</li>
			<li>
				<el-button @click="dialogVisible = true">新增</el-button>
			</li>
			<li>
				<router-link to="roleManager"><el-button>角色管理</el-button></router-link>
			</li>
		</ul>
		<el-table
			:data="tableData"
			style="width: 100%"
		>
			<el-table-column
				prop="userId"
		        label="UID"
			>
			</el-table-column>
			<el-table-column
				prop="loginname"
		        label="手机号"
			>
			</el-table-column>
			<el-table-column
				prop="username"
		        label="用户名"
			>
			</el-table-column>
			<el-table-column
				prop="roleName"
		        label="角色"
			>
			</el-table-column>
			<el-table-column
		        label="操作"
		        width="200"
			>
				<template slot-scope="scope">
					<el-button @click="editClick(scope.row)" type="success" size="small">编辑</el-button>
					<el-button type="danger" size="small" @click="deleteRow(scope.$index, tableData)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page.sync="userList.pageIndex"
            :page-sizes="[10,20,30, 50]" :page-size="userList.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-dialog 
			:visible.sync="dialogVisible"
        >
        	<add-model type="add" :roleOptions="options" @closeWindow="dialogVisible = false"></add-model>
        </el-dialog>
        <el-dialog
			:visible.sync="updateDialogVisible"	
        >
        	<add-model :id="update" type="update" :roleOptions="options" @closeWindow="updateDialogVisible = false"></add-model>
        </el-dialog>
	</div>
</template>
<script>
	import msgManager from './index.js';
	export default msgManager;
</script>
<style lang="scss" scoped>
	.header{
		display: flex;
		overflow: hidden;
		align-items:center;
		li{
			margin-left: 25px;
		}
	}
	.mouse{
		cursor:pointer; 
	}
</style>
