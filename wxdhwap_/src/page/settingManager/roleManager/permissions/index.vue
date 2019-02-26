<template>
	<div class="permissions-page">
		<div class="parentMenu">
			<div class="parentMenu_title fontBig">{{allMenu.parentMenu.title}}</div>
			<div class="marTop" v-for="(value, key) in allMenu.parentMenu.data">
				<div>{{value.text}}</div>
				<el-checkbox-group v-model="allMenu.parentMenu.arrCheckd[key]">
					<el-checkbox v-for="(item, index) in value.children" :label="item.id">{{item.text}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<div class="infoMenu marTop">
			<div class="infoMenu_title fontBig">{{allMenu.infoMenu.title}}</div>
			<div class="marTop" v-for="(value, key) in allMenu.infoMenu.data">
				<div>{{value.text}}</div>
				<el-checkbox-group v-model="allMenu.infoMenu.arrCheckd[key]">
					<el-checkbox v-for="(item, index) in value.children" :label="item.id">{{item.text}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<div class="operateMenu marTop">
			<div class="operateMenu_title fontBig">{{allMenu.operateMenu.title}}</div>
			<div class="marTop" v-for="(value, key) in allMenu.operateMenu.data">
				<div>{{value.text}}</div>
				<el-checkbox-group v-model="allMenu.operateMenu.arrCheckd[key]">
					<el-checkbox v-for="(item, index) in value.children" :label="item.id">{{item.text}}</el-checkbox>
				</el-checkbox-group>
			</div>
		</div>
		<el-row class="marTop">
		  	<el-col :span="24">
		  		<el-button @click="save">保存</el-button>
		  	</el-col>
		</el-row>
	</div>
</template>
<script>
	import permissions from './index.js';
	export default permissions;
</script>
<style lang="scss">
	.permissions-page{
		padding: 25px;
	}
	.marTop{
		margin-top: 20px; 
	}
	.fontBig{
		font-size: 24px;
	}
</style>