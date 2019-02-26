<template>
    <span>
        <el-button type="text" @click="handleCreate">{{btnText}}</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="批量选中" id="multidialog" width="550px">
			<el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
				<el-form-item label="微信库ID">
					<el-input v-model="temp.startId" size="small"></el-input>
					至
					<el-input v-model="temp.endId" size="small"></el-input>
				</el-form-item>
				<el-form-item label="状态">
				<el-select class="filter-item" v-model="temp.trackStatus" placeholder="请选择">
					<el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				</el-form-item>
				<el-form-item label="标注">
					<el-select class="filter-item" v-model="temp.markStatus" placeholder="请选择">
						<el-option v-for="item in marks" :key="item.key" :label="item.display_name" :value="item.key">
					</el-option>
				</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="create">确 定</el-button>
			</div>
    	</el-dialog>
    </span>
</template>
<script>
const statusOptions = [
	{
	value: '1',
	label: '初始'
	}, {
	value: '2',
	label: '初次接洽'
	}, {
	value: '3',
	label: '接洽完成'
	}, {
	value: '4',
	label: '正在收集'
	}, {
	value: '5',
	label: '收集完成'
	}, {
	value: '6',
	label: '收集失败'
	}, {
	value: '7',
	label: '正在追踪'
	}, {
	value: '8',
	label: '追踪完成'
	},{
	value: '9',
	label: '正在投放'
	},{
	value: '10',
	label: '完成投放'
	},
]
const marks = [
	{ key: '0', display_name: '全部' },
	{ key: '1', display_name: '待观察' },
	{ key: '2', display_name: '可投放' },
	{ key: '3', display_name: '搁置' },	
]
  export default {
	props:['btnText','multiCheckedID'],
	data() {
		return {
			temp: {
				startId: '',
				endId:'',
				trackStatus:'',
				markStatus: '',
				pageSize:'10',
				pageIndex:'1'
			},
			dialogFormVisible: false,
			dialogPvVisible: false,
			statusOptions,
			marks,
		};
	},
	mounted(){
	},
	methods: {
		create() {
			this.$emit("multiChoseID",this.temp);
			this.dialogFormVisible = false;
		},
		resetTemp() {
			this.temp = {
				startId: '',
				endId:'',
				trackStatus:'',
				markStatus: '',
				pageSize:'10',
				pageIndex:'1'
			}
		},
		handleCreate() {
			this.resetTemp()
			this.dialogFormVisible = true;
		},
	}
  };
</script>
<style lang="scss" scoped>

</style>