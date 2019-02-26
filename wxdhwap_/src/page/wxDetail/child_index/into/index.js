import model from '../../model.vue'
import {findDeliveryByWechatIdList} from '@/service/getData'
import {deepCopy} from '@/config/mUtils'
import {changeStatusCode} from '@/utils/'

const initColum = [
	{property: "position", label: "位置"},
	{property: "deliverytime", label: "投放时间"},
	{property: "price", label: "价格"},
	{property: "deliveryusername", label: "投放人"},
	{property: "deliverystate", label: "状态"},
	{property: "action", label: "操作", moreaction: true}	
];

export default{
	data(){
		return{
			reciveData:[],
			reciveColum: initColum,
			table:{
				pageIndex: 1,
				pageSize: 10,
				wechatid: ''
			},
			total:'',
			filterData:[],
			intoVisible: false,
		}
	},
	methods:{
		async init(){
			this.table.wechatid = this.$route.query.wechatId;
			var result = await findDeliveryByWechatIdList(this.table);
			this.reciveData = result.resultData.list;
			changeStatusCode(this.reciveData, 
							['deliverystate', 'position'], 
							[{1:'软广', 2:' 硬广', 3:'贴图', 4:'其他'}, {1:'1条', 2:'2条', 3:'3条', 4:'4条', 5:'5条', 6:'6条',7:'7条',8:'8条'}]
							);
			this.filterData = deepCopy(this.reciveData.slice(0,4));
			this.total = result.resultData.total;
		},
		async changeTable(){
			this.table.wechatid = this.$route.query.wechatId;
			var result = await findDeliveryByWechatIdList(this.table);
			this.reciveData = result.resultData.list;
			this.total = result.resultData.total;
		},
		changeSize(val){
			this.table.pageSize = val
			this.changeTable();
		},
		changeCurrent(val){
			this.table.pageIndex = val
			this.changeTable();
		}
	},
	mounted(){
		this.init();
	},
	components:{
		model
	}
}