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
     * 非负整数
     */
  isInteger(num){
    return /^[0-9]\d*$/i.test(num);
  },
  isInteger_(num){
    return /^-?[0-9]\d*$/i.test(num);
  },
  
  /**
   * 是否为数字*/
  isNumber(param){
    return isNaN(param);
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
  /**
   * 刘思奇----2018/10/29
   * 将unix时间戳转化为年月日*/
  formatUnixTimeNew(time){
    if(time == null){return '';}
    let timeStamp = new Date(time);
    let hours = 0;
    let minutes = 0;
    let month = 0;
    let date = 0;
    if(timeStamp.getMinutes()<10){
      minutes = '0'+timeStamp.getMinutes();
    }else{
      minutes = timeStamp.getMinutes();
    }
    if(timeStamp.getHours()<10){
      hours = '0'+timeStamp.getHours();
    }else{
      hours = timeStamp.getHours();
    }
    if(timeStamp.getMonth()<10){
      month = '0'+timeStamp.getMonth();
    }else{
      month = timeStamp.getMonth();
    }
    if(timeStamp.getDate()<10){
      date = '0'+timeStamp.getDate();
    }else{
      date = timeStamp.getDate();
    }
    return timeStamp.getFullYear() + "-"
      + (parseInt(month) + 1) + "-" + date + " "
      + hours + ":" + minutes
  },
    /**
   * 将unix时间戳转化为yy-mm-dd*/
  formatUnixDateTime(time){
    if(time == null){return '';}
    let timeStamp = new Date(time);
    return timeStamp.getFullYear() + "-"
      + (timeStamp.getMonth() + 1) + "-" + timeStamp.getDate() + "-"
      + timeStamp.getHours() + "-" + timeStamp.getMinutes();
  },
  /**
   * 计算天数差
   * @param  {[type]} sDate1 [2017-08-15]  end
   * @param  {[type]} sDate2 [description]
   * @return {[type]}        [description]
   */
  dateDiff(endDate,startDate) {
    let aDate,  oDate1,  oDate2,  iDays ;
    aDate  =  endDate.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2006格式
    aDate  =  startDate.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays
  },
  /**
   * 判断时间间隔差是否合法
   * @param beginTimes 开始时间
   * @param endTimes 结束时间
   * @param range 时间间隔*/
  JudgeDate(beginTimes,endTimes,range){
    let startTime = new Date(beginTimes).getTime();
    let endTime = new Date(endTimes).getTime();
    let day = parseInt((endTime - startTime)/1000/(24*60*60));

    return day > range;
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
    Arr.add('/DetailLoanData');
    Arr.add('/OrderDetail');
    Arr.add('/SecondBuckleOrderDetail');
    Arr.add('/OrderInfoControl');
    Arr.add('/OfflineOrderRepayDetail');
    return Arr;
  }
};

export default DataUtil;
