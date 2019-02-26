import {queryAllMenuByroleId, saveRights} from '@/service/getData';
import {queryAllMenuByroleIdAdapter} from '@/utils/adapter.js';

export default{
	data(){
		return{
			allMenu: {}
		}
	},
	mounted(){
		this.init();
	},
	methods:{
		async init(){
			let result = await queryAllMenuByroleId({roleId: this.getRoleId()});
			if(!result.success) return;
			let allMenu = queryAllMenuByroleIdAdapter(result.data);
			this.allMenu = allMenu; 
		},
		async save(){
			let result = await saveRights({roleId: this.getRoleId(), roleMenuId: this.filterData()})
			if(!result.success) return;
			this.$message({
  		        message: result.message,
  		        type: 'success'
  			});
  			
		},
		getRoleId(){
			return this.$route.query.roleId;
		},
		filterData(){
			let arr = [];
			let {keys, values, entries} = Object;
			for (let value of values(this.allMenu)) {
				
			  // 	if(value.deep == 1){
			  // 		// console.log(123,value.checkd);
					// arr = arr.concat(value.checkd);
			  // 	}else if(value.deep == 2){
			  // 		for(let valueItem of values(value)){
			  // 			if(valueItem.hasOwnProperty("checkd"))
					// 		arr = arr.concat(valueItem.checkd);
			  // 		}
					
			  // 	}
				for(let valueItem of values(value.arrCheckd)){
					for(let item of values(valueItem)){
						arr.push(item);
		  			}
				}
			}
			return arr.toString();
		}
	}
}