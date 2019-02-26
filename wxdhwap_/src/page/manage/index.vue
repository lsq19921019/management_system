<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="height: 100%;">
				<el-menu :default-active="defaultActive" style="height: 100%;" theme="dark" router>
					<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-document"></i>工作台</template>
						<el-menu-item index="wxk">微信库</el-menu-item>
						<el-menu-item index="supplier">供应商</el-menu-item>
						<el-menu-item index="favorite">收藏夹</el-menu-item>
						<el-menu-item index="myInto">我的投放</el-menu-item>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-document"></i>我的任务</template>
						<el-menu-item index="contact">接洽任务</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-document"></i>数据统计</template>
						<el-menu-item index="taskData">任务数据</el-menu-item>
					</el-submenu>
					<el-submenu index="5">
						<template slot="title"><i class="el-icon-plus"></i>设备管理</template>
						<el-menu-item index="wxkManager">微信库管理</el-menu-item>
						<el-menu-item index="supplierManager">供应商管理</el-menu-item>
						<el-menu-item index="msgManager">用户管理</el-menu-item>
						<el-menu-item index="secret">账号管理</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<navbar></navbar>
				<router-view></router-view>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import Navbar from './navBar.vue'
    export default {
    	components:{
			Navbar
    	},
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>
