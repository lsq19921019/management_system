<template>
	<section>
		<el-tabs v-model="activeName" type="border-card" @tab-click="tabChange">
	    <el-tab-pane v-for="item in tabList" :label="item.dicItemName" :key="item.dicItemName" :name="item.dicItemName">
	    	<ml-order-list :dialog-title="item.dicItemName" :post-id="item.id" :item-value="item.dicItemValue" :ref="item.dicItemName"></ml-order-list>
	    </el-tab-pane>
  	</el-tabs>
	</section>
</template>
<script>
	import mlOrderList from '../../components/TestOrderTab.vue';
	export default {
		data() {
			return {
				tabList: [],
				activeName:''
			}
		},
		methods: {
			getTabList() {
				this.$http.post('manage/dicItemListByDicCode',{dicCode:'COLLECTION_POST'}).then(response => {
					let {body} = response;
					if(body.code == 1){
						this.activeName = body.data[0].dicItemName;
						this.tabList = body.data;
					}else{
						this.$message.error(body.message);
					}
				},response =>{});
			},
			tabChange(e) {
				this.$refs[e.name][0].bindGrid();
			}
		},
		components: {
			mlOrderList
		},
		mounted() {
			this.getTabList();
		}
	}
</script>
<style></style>