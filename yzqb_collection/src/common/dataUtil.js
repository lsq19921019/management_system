/**
 * Created by alan on 17-4-30.
 */
const DataUtil = {
  /**
   * 手机验证*/
  isMobile(param) {
    return /^[1][34578][0-9]{9}$/i.test(param);
  },

  /**
   * 是否为数字*/
  isNumber(param){
    return isNaN(param);
  },
  /**
   * 非负整数
   */
  isInteger(num){
    return /^[0-9]\d*$/i.test(num);
  },

  /**
   * 四舍五入保留num位小数
   * val为需四舍五入数字, num为需要四舍五入的位数*/
  keepDecimal(val,num = 0){
    let result = Number(val).toFixed(num);
    if(result == 'NaN'){
      result = '';
    }
    return result;
  },

  /**
   * 格式化年月日 format为格式 eg:yyyy-MM-dd*/
  formatTime(dateTime,format = "yyyy-MM-dd"){
    if(!dateTime) return dateTime;
    let args = {
      "M+": dateTime.getMonth() + 1,
      "d+": dateTime.getDate(),
      "h+": dateTime.getHours(),
      "m+": dateTime.getMinutes(),
      "s+": dateTime.getSeconds(),
      "q+": Math.floor((dateTime.getMonth() + 3) / 3),  //quarter
      "S": dateTime.getMilliseconds()
    };
    if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var i in args) {
      let n = args[i];
      if (new RegExp("(" + i + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
    }
    return format;
  },

  /**
   * 将unix时间戳转化为年月日*/
  formatUnixTime(time){
    if(time == null){return '';}
    let timeStamp = new Date(time);
    return timeStamp.getFullYear() + "年"
      + (timeStamp.getMonth() + 1) + "月" + timeStamp.getDate() + "日"
      + timeStamp.getHours() + "时" + timeStamp.getMinutes() + "分";
  },

  formatUnixDateTime(time){
    let timeStamp = new Date(time);
    return timeStamp.getFullYear() + "-"
      + (timeStamp.getMonth() + 1) + "-" + timeStamp.getDate() + " "
      + timeStamp.getHours() + ":" + timeStamp.getMinutes();
  },

  /**
   * json转string*/
  json2Str(param){
    return JSON.stringify(param);
  },

  /**
   * string转json*/
  str2Json(param){
    return JSON.parse(param);
  },

  /**
   * localStorage操作*/
  setStorage(key,value){
    return localStorage.setItem(key,value);
  },
  getStorage(key){
    return localStorage.getItem(key);
  },
  clearStorage(key){
    localStorage.removeItem(key);
  },

  /**
   * 登陆用户信息
   * param为''则为清除,  param == undefined为获取值, param传入对象则为写入值*/
  userUtil(name,param){
    if(param === ''){
      return this.clearStorage(name);;
    }
    if(param){
      return this.setStorage(name,param);
    }else{
      return this.getStorage(name);
    }
  },

  /**
   * 用户的sessionId*/
  sid(param){
    return this.userUtil('adminSid',param);
  },

  /**
   * 用户的userId*/
  id(param){
    return this.userUtil('adminId',param);
  },

  /**
   * */
  uuid(param){
    return this.userUtil('adminUuid',param);
  },

  /**
   * 用户的登陆账户*/
  account(param){
    return this.userUtil('adminAccout',param);
  },

  /**
   * 用户的姓名*/
  userName(param){
    return this.userUtil('adminName',param);
  },

  /**
   * 保存用户url权限*/
  savePermission(param){
    let permission = this.json2Str(param);
    return this.userUtil('adminPermission',permission);
  },

  /**
   * 获取用户url权限*/
  getPermission(){
    return this.str2Json(this.userUtil('adminPermission'));
  },
  getPermissionSet() {
    let Obj = this.getPermission();
    let Arr = new Set();
    const getPermission = (tmpObj) => {
      for (let key in tmpObj) {
        if (tmpObj[key].permissionUrl) {
          Arr.add(tmpObj[key].permissionUrl);
        }
        if (tmpObj[key].children) {
          getPermission(tmpObj[key].children)
        }
      }
    };
    getPermission(Obj);

    //这些页面不判断是否具有权限
    Arr.add('/home');
    Arr.add('/404');
    Arr.add('/login');
    Arr.add('/UserDetail');
    Arr.add('/OrderDetail');
    Arr.add('/OrderInfoControl');
    return Arr;
  }
};

export default DataUtil;
