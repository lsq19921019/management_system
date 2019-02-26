/**
 * [Utils 工具方法类]
 * @type {Object}
 */
export const Utils = {};

Utils.install = function (Vue, options) {
	Vue.prototype._leftOutNull= (data) => {
		for(let k in data){
			if(data[k] == null){
				data[k] = '';
			}
		}
	}
}


/**
 * 去掉null值
 */
export const leftOutNull = data => {
	
	for(let k in data){
		if(data[k] == null){
			data[k] = '';
		}
	}

}


/**
 * change histrack pubLocation data
 * #即将移除  
 */
export const pubLocation = (data,param) => {
	//data must type []
	for(let v of data){
		if(v[param] == 1){
			v[param] = '头条';
		}else if(v[param] == 2){
			v[param] = '次条';
		}else if(v[param] == 3){
			v[param] = '三条';
		}else if(v[param] == 4){
			v[param] = '四条';
		}else if(v[param] == 5){
			v[param] = '五条';
		}else{
			v[param] = '';
		}
	}
}


/**
 * 合并对象，仅合并目标对象属性的值
 */
export const mergePrivateKey = (target, source) => {
	for (let key of Object.keys(source)) {
		if(target.hasOwnProperty(key)){
			target[key] = source[key];
		}
	}
}


/**
 * 手机号号正则校验
 */
export const valMoveTel = (value, callback) => {
	if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){ 
		callback(false); 
	}else{
		callback(true);
	}
}

/**
 * 电话号正则校验
 */
export const valFixedTel = (value, callback) => {
	if(!(/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value))){
		callback(false);
	}else{
		callback(true);
	}
}

/**
 * 工作台状态筛选
 */
export const wxkStatus = {
	trackStatus:[
		{
			value: '',
			label: '全部'
		}, {  //跟踪状态
			value: '0',
			label: '初始化失败'
		}, {  //跟踪状态
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
		}, {
			value: '9',
			label: '正在投放'
		}, {
			value: '10',
			label: '完成投放'
		}]
		
}

/**
 * 工作台数据过滤
 */
export const filters = {
	formateVal(val, sta) {
		if (sta == 'track') {
			if(val == '0'){
				return '初始化失败'
			}else if (val == '1') {
				return '初始';
			} else if (val == '2') {
				return '初次接洽';
			} else if (val == '3') {
				return '接洽完成'
			} else if (val == '4') {
				return '正在收集';
			} else if (val == '5') {
				return '收集完成'
			} else if (val == '6') {
				return '收集失败';
			} else if (val == '7') {
				return '正在追踪'
			} else if (val == '8') {
				return '追踪完成';
			} else if (val == '9') {
				return '正在投放';
			} else if (val == '10') {
				return '完成投放';
			} else {
				return '';
			}
		} else if (sta == 'marks') {
			if (val == 1) {
				return '待观察'
			} else if (val == 2) {
				return '可投放'
			} else if (val == 3) {
				return '搁置'
			}
		} else if(sta == 'delivery'){

		}
	}
}


export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
	'[object Boolean]': 'boolean',
	'[object Number]': 'number',
	'[object String]': 'string',
	'[object Function]': 'function',
	'[object Array]': 'array',
	'[object Date]': 'date',
	'[object RegExp]': 'regExp',
	'[object Undefined]': 'undefined',
	'[object Null]': 'null',
	'[object Object]': 'object'
  };
  return map[toString.call(obj)];
}


/**
 * 深拷贝
 */
export const deepCopy = (data) => {
	const t = typeOf(data);
	  let o;

	  if (t === 'array') {
		o = [];
	  } else if (t === 'object') {
		o = {};
	  } else {
		return data;
	  }

	  if (t === 'array') {
		for (let i = 0; i < data.length; i++) {
		  o.push(deepCopy(data[i]));
		}
	  } else if (t === 'object') {
		for (let i in data) {
		  o[i] = deepCopy(data[i]);
		}
	  }
	  return o;
}

export const getTime = (n) =>{
	let 	now = new Date(),
		year = now.getFullYear(),//因为月份是从0开始的,所以获取这个月的月份数要加1才行
		month = now.getMonth() + 1,	
		date = now.getDate(),
		day = now.getDay();

	//判断是否为周日,如果不是的话,就让今天的day-1(例如星期二就是2-1)
	if(day !== 0){
		n = n + (day - 1);
	}else{
		n = n + day;
	}
	if(day){
		//这个判断是为了解决跨年的问题
		if(month > 1){
			month = month;
		}else{//这个判断是为了解决跨年的问题,月份是从0开始的
			year = year-1;
			month = 12;
		}
	}
	now.setDate(now.getDate() - n);
	let s = now.getTime();
	//let s = year + "年" + (month < 10 ? ( '0' + month) : month) + "月" + (date < 10 ? ('0' + date) : date) + "日";
	return s;
	/***参数都是以周一为基准的***/
	//上周的开始时间
	//console.log(getTime(7));
	//上周的结束时间
	//console.log(getTime(1));
	//本周的开始时间
	//console.log(getTime(0));
	//本周的结束时间
	//console.log(getTime(-6));
}
