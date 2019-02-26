let num1 = /(^\d{1,3}$)|(^\d{0,2}\.\d{1,4}$)/;
export function checkLength(title,len) {
    return function(rule,value,callback) {
        if (value === '' && rule.required) {
            callback(new Error(`请输入${title}`));
        } else if(value.length > len) {
            callback(new Error(`最多可以填写${len}个字符`));
        } else {        
            callback();
        }
    }    
};
//推广渠道管理扣量比例校验
export function kouLiangRate(title,len) {
    return function(rule,value,callback) {
        if (value === '' && rule.required) {
            callback(new Error(`请输入${title}`));
        } else if(value > 100 || value < 0 || !num1.test(value)) {
            callback(new Error(`请输入正确的${title}值`));
        } else {        
            callback();
        }
    }    
};