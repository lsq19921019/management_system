// 适配器

/**
 * [重组权限分配接口返回值，来适配业务]
 * @param  {[Object]} oldData [权限分配接口返回值]
 * @return {[Object]}         [重组以后的新值]
 */
function queryAllMenuByroleIdAdapter(oldData){
	
	
	
	let parentMenu = {
		data: oldData.parentMenu,
		title: "菜单权限",
		arrCheckd:[]
	}

	oldData['parentMenu'].forEach((v, i) =>{
		let arr = [];
		v.children.forEach((j, k) => {
			if(j.checked){
				arr.push(j.id);
			}
		})
		parentMenu.arrCheckd.push(arr);
	});


	let infoMenu = {
		data: oldData.infoMenu,
		title: "信息权限",
		arrCheckd:[]
	}

	oldData['infoMenu'].forEach((v, i) =>{
		let arr = [];
		v.children.forEach((j, k) => {
			if(j.checked){
				arr.push(j.id);
			}
		})
		infoMenu.arrCheckd.push(arr);
	});

	let operateMenu = {
		data: oldData.operateMenu,
		title: "操作权限",
		arrCheckd:[]
	}

	oldData['operateMenu'].forEach((v, i) =>{
		let arr = [];
		v.children.forEach((j, k) => {
			if(j.checked){
				arr.push(j.id);
			}
		})
		operateMenu.arrCheckd.push(arr);
	});



	// let infoMenu = {
	// 	wx:{
	// 		options: [],
	// 		checkd: [],
	// 		name:[]
	// 	},
	// 	tf:{
	// 		options: [],
	// 		checkd: [],
	// 		name:[],
	// 	},
	// 	title: "信息权限",
	// 	deep:2
	// }

	// let operateMenu = {
	// 	wx:{
	// 		options: [],
	// 		checkd: [],
	// 		name:[],
	// 	},
	// 	tf:{
	// 		options: [],
	// 		checkd: [],
	// 		name:[]
	// 	},
	// 	wxk:{
	// 		options: [],
	// 		checkd: [],
	// 		name:[],
	// 	},
	// 	title: "操作权限",
	// 	deep: 2
	// }

	// let parentMenu = oldData.parentMenu;
	
	// oldData['parentMenu'].forEach((v, i) =>{
	// 	parentMenu['options'].push(v.menuId);
	// 	parentMenu['name'].push(v.menuName)
	// 	if(v.hasMenu){
	// 		parentMenu['checkd'].push(v.menuId);
	// 	}
	// });



	// oldData['infoMenu'].forEach((v, i) =>{
		
	// 	if(v.text == '投放详情页'){
	// 		infoMenu['wx']['title'] = v.text;
	// 		v.children.forEach((v, i) => {
	// 			infoMenu['wx']['options'].push(v.id);
	// 			infoMenu['wx']['name'].push(v.text)
	// 			if(v.checked){
	// 				infoMenu['wx']['checkd'].push(v.id);
	// 			}
	// 		})
	// 	}else{
	// 		infoMenu['tf']['title'] = v.text;
	// 		v.children.forEach((v, i) => {
	// 			infoMenu['tf']['options'].push(v.id);
	// 			infoMenu['tf']['name'].push(v.text);
	// 			if(v.checked){
	// 				infoMenu['tf']['checkd'].push(v.id);
	// 			}
	// 		})
	// 	}
	// });

	// oldData['operateMenu'].forEach((v, i) =>{
	// 	// v['title'] = v.text;
	// 	if(v.text == '投放详情页'){
	// 		operateMenu['wx']['title'] = v.text;
	// 		v.children.forEach((v, i) => {
	// 			operateMenu['wx']['options'].push(v.id);
	// 			operateMenu['wx']['name'].push(v.text);
	// 			if(v.checked){
	// 				operateMenu['wx']['checkd'].push(v.id);
	// 			}
	// 		})
	// 	}else if(v.text == '微信详情页'){
	// 		operateMenu['tf']['title'] = v.text;
	// 		v.children.forEach((v, i) => {
	// 			operateMenu['tf']['options'].push(v.id);
	// 			operateMenu['tf']['name'].push(v.text);
	// 			if(v.checked){
	// 				operateMenu['tf']['checkd'].push(v.id);
	// 			}
	// 		})
	// 	}else{
	// 		operateMenu['wxk']['title'] = v.text;
	// 		v.children.forEach((v, i) => {
	// 			operateMenu['wxk']['options'].push(v.id);
	// 			operateMenu['wxk']['name'].push(v.text);
	// 			if(v.checked){
	// 				operateMenu['wxk']['checkd'].push(v.id);
	// 			}
	// 		})
	// 	}
	// });

	return {
		infoMenu,
		operateMenu,
		parentMenu
	}
}


export {
	queryAllMenuByroleIdAdapter
}