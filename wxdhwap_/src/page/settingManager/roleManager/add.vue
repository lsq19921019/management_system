<template>
	<div class="msgAdd-page">
		<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
			<el-form-item label="角色名称" prop="roleName">
				<el-input v-model="ruleForm.roleName" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="save('ruleForm')">保存</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import msgAdd from './add.js';
	export default msgAdd;
</script>