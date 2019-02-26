import {checkRights} from "@/service/getData";

/**
 * [typeOf 类型检测]
 * @param  {[any]} obj [任意类型]
 * @return {[String]}     [返回类型的字符串]
 */
function typeOf(obj) {
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
 * [changeStatusCode 转换后台状态码]
 * @param  {[Array]} source [源数据]
 * @param  {[Array]} param  [后台参数]
 * @param  {[Array]} target [需要转化的数据]
 * 注意：O(n)算法；source源数据会被污染，用deepcopy数据最佳
 */
function changeStatusCode(source, param, target){

	if(typeOf(source) !== 'array') return;
	if(typeOf(param) !== 'array') return;
	if(typeOf(target) !== 'array') return;

	for(let i = 0; i < source.length; i++){
		if(typeOf(source[i]) !== 'object') return;
		for(let n = 0; n < param.length; n++){
			// 取出对象参数
			source[i][param[n]] = target[n][source[i][param[n]]];
		}
	}
}

/**
 * [roleCheckRights 批量处理'查询角色是否菜单权限'接口]
 * @param  {Object} obj [所有接口的对象集合]
 */
function roleCheckRights(obj){
    
    if(typeOf(obj) !== 'object') return;
    let allPromise = [];
    let {values} = Object;
    for(let value of values(obj)){
        allPromise.push(checkRights({roleMenu: value.url}));
    }
    Promise.all(allPromise)
    .then(result => {
        if(typeOf(result) !== 'array') return;
        let i = 0;
        for(let value of values(obj)){
            value.state = result[i].success;
            value.msg = result[i].message;
            i++;
        }
    })
    .catch(e => {
      console.log(e);
      return;
    });
}

function format(){ 
    Date.prototype.format = function(fmt){
        var o = { 
            "M+" : this.getMonth()+1,                 //月份 
            "d+" : this.getDate(),                    //日 
            "h+" : this.getHours(),                   //小时 
            "m+" : this.getMinutes(),                 //分 
            "s+" : this.getSeconds(),                 //秒 
            "q+" : Math.floor((this.getMonth()+3)/3), //季度 
            "S"  : this.getMilliseconds()             //毫秒 
        }; 
        if(/(y+)/.test(fmt)) {
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
         for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
                 fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
             }
         }
        return fmt; 
    }
}  

export {
	typeOf,
	changeStatusCode,
    roleCheckRights,
    format
}