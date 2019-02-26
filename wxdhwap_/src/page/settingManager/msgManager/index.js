import {findUserList, findRoleList, deleteUser} from '@/service/getData';
import addModel from './add.vue';
export default{
	data(){
		return{
			valueRole:'',
			options:'',
			userList:{
				pageIndex: 1,
				pageSize: 10,
				roleId: '',
				sort: 'asc'
			},
			tableData:[],
			total:0,
			dialogVisible: false,
			updateDialogVisible: false,
			update:{
				userId: 0,
				olduserId: 0
			},
			visible2: false
		}
	},
	methods:{
		async init(){
			{
				let result = await findRoleList();
				this.options = result.data;
				this.valueRole = this.options[0].roleId;
				this.userList.roleId = this.options[0].roleId || '';
			}

			{
				let result = await findUserList(this.userList);
				this.tableData = result.data.list;
				this.total = result.data.total;
			}
		},
		async changeTable(){
			let result = await findUserList(this.userList);
			this.tableData = result.data.list;

			this.total = result.data.total;
		},
		desc(){
			this.userList.sort = 'desc';
			this.changeTable();
		},
		asc(){
			this.userList.sort = 'asc';
			this.changeTable();
		},
		editClick(val){
			this.updateDialogVisible = true;
			// this.updateRoleId = val.role.roleId;
			// this.updateUserId = val.userId;

			if(this.olduserId != val.userId){
				this.update = Object.assign({}, this.update, {userId: val.userId});
				this.olduserId = val.userId;
			}
			// this.$set(this.update, "userId", val.userId);
			// this.$set(this.update, "roleId", val.role.roleId);
			// , roleId:val.role.roleId
			// console.log(this.update);
		},
		deleteRow(index, rows){
			this.$confirm('确认删除？').then(async _ => {
					let result = await deleteUser({userId: rows[index].userId});
					if(result.success == true){
						this.$message({
							message: result.message,
							type: 'success'
						});
						rows.splice(index, 1);
					}else{
						this.$message.error(result.message);
					}
			}).catch(_ => {});
		},
		roleChange(val){
			this.userList.roleId = val;
			this.changeTable();
		},
		sizeChange(val){
			this.userList.pageSize = val;
			this.changeTable();
		},
		pageChange(val){
			this.userList.pageIndex = val;
			this.changeTable();
		}
	},
	mounted(){
		this.init();
	},
	components:{
		addModel
	}
}
