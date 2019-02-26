export default{
	name: 'model',
	props:{
		reciveColum:{
			type: Array
		},
		reciveData:{
			type: Array
		},
		trackDetailInfo:{
			type: Object
		}
	},
	render(createElement){
		var Chain = function( fn ){
			this.fn = fn;
			this.successor = null;
		};
		Chain.prototype.setNextSuccessor = function( successor ){
			return this.successor = successor;
		};
		Chain.prototype.passRequest = function(){
			var ret = this.fn.apply( this, arguments );
			if ( ret === 'nextSuccessor' ){
			return this.successor && this.successor.passRequest.apply( this.successor, arguments );
			}
			return ret;
		}
		
		var template1 = function( item ){
			console.log(21345, item.moreaction);
			if(!item.link && !item.action && !item.moreaction){
				return createElement('el-table-column', 
					{
						'attrs':{
							property: item.property,
							label: item.label
						}
					}
				)
			}else{
				return 'nextSuccessor';
			}
		};

		var template2 = function( item ){
			if(item.link){
				return createElement('el-table-column', 
					{
						'attrs':{
							label: item.label
						}
					},
					[
						createElement('template', 
						{
							'attrs':{
								'slot-scope': 'scope'
							}
						},
						[
							createElement('a', {
								'attrs':{
									target:'_blank',
									href: scope.row.link
								}
							})
						]	
						)
					]
				)
			}else{
				return 'nextSuccessor';
			}
		};

		var template3 = function( item ){

			if(item.moreaction){

				return createElement('el-table-column', 
					{
						'attrs':{
							label: item.label
						}
					},
					[
						createElement('div', {
							'attrs':{
								'slot-scope':'scope'
							}
						},[
							createElement('el-button', {
								'attrs':{
									'size':'mini'
								}
							},[
								createElement('router-link',{
									'attrs':{
										'target':'_blank',
										'to':"{path:'/myIntoDetail', query:{wid: scope.row.id}}"
									},
									'domProps':{
										innerHTML: '123'
									}
								})
							])
						])
					])
			}else{
				return 'nextSuccessor';
			}
		};

		var chaintemplate1 = new Chain( template1 );
		var chaintemplate2 = new Chain( template2 );
		var chaintemplate3 = new Chain( template3 );
		
		chaintemplate1.setNextSuccessor(chaintemplate2);
		chaintemplate2.setNextSuccessor(chaintemplate3);

		return createElement('el-table', 
			{
				attrs:{
					data: this.reciveData,
					style: "width: 100%"
				}
			} , 
			this.reciveColum.map(function(item){
				return chaintemplate1.passRequest(item);
			})
		);
	}
}