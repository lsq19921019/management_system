var base = {
  errorStr: "服务器出错了，请稍后再试",
  apiStr: "/api",
  secretKey: '3cf8dec999164de3a334e3488b04aaf6',
  desKey: '1492bd85794e4217a82bf145fa1dc68e',
  //每次请求检查服务器是否返回token以保持用户登录状态
  getHeadToken: "if (arguments[2].getResponseHeader('token')) {localStorage.setItem('_token', arguments[2].getResponseHeader('token'));}",

  //设置设备码并存入本地存储
  setImei: function() {
    localStorage.setItem('_imei', base.data.timeStamp);
  },
  //移除设备码
  removeImei: function() {
    localStorage.removeItem('_imei');
  },
  //获取设备码
  getImei: function() {
    return localStorage.getItem('_imei') ? localStorage.getItem('_imei') : '';
  },
  // 加密串方法
  getPostStr: function(obj) {
    //判断有没有加密方法
    if (typeof CryptoJS.HmacSHA256 == 'function' && typeof CryptoJS.enc.Base64.stringify == 'function') {
      var timeStamp = base.data.timeStamp,
        keyArr = [],
        o = obj,
        signStr = '';
      if (o) {
        for (var n in base.data) o[n] = base.data[n];
      } else {
        o = base.data;
      }
      for (var k in o) keyArr.push(k);

      keyArr.sort();
      for (var i = 0, l = keyArr.length; i < l; i++) signStr += keyArr[i] + '=' + o[keyArr[i]] + '&';
      signStr = signStr.substr(0, signStr.length - 1);
      signStr = CryptoJS.HmacSHA256(signStr, base.secretKey);
      return CryptoJS.enc.Base64.stringify(signStr);
    } else {
      throw new Error('参数错误');
    }
  },
  // 加密串方法 (不带token加密)
  getPostStrWithoutToken: function(obj) {
    //判断有没有加密方法
    if (typeof CryptoJS.HmacSHA256 == 'function' && typeof CryptoJS.enc.Base64.stringify == 'function') {
      var timeStamp = base.dataWithoutToken.timeStamp,
        keyArr = [],
        o = obj,
        signStr = '';
      if (o) {
        for (var n in base.dataWithoutToken) o[n] = base.dataWithoutToken[n];
      } else {
        o = base.dataWithoutToken;
      }
      for (var k in o) keyArr.push(k);
      keyArr.sort();
      for (var i = 0, l = keyArr.length; i < l; i++) signStr += keyArr[i] + '=' + o[keyArr[i]] + '&';
      signStr = signStr.substr(0, signStr.length - 1);
      signStr = CryptoJS.HmacSHA256(signStr, base.secretKey);
      return CryptoJS.enc.Base64.stringify(signStr);
    } else {
      throw new Error('参数错误');
    }
  },
  //带token -- headers
  ajaxHeadersWithToken: function(obj) {
    var headers = {
      "clientType": base.data.clientType,
      "clientVersion": base.data.clientVersion,
      "timeStamp": base.data.timeStamp,
      "sign": base.getPostStr(obj),
      "token": base.data.token,
      "imei": base.data.timeStamp
    };
    return headers;
  },
  //不带token --headers
  ajaxHeaderWithoutToken: function(obj) {
    var headers = {
      "clientType": base.dataWithoutToken.clientType,
      "clientVersion": base.dataWithoutToken.clientVersion,
      "timeStamp": base.dataWithoutToken.timeStamp,
      "sign": base.getPostStrWithoutToken(obj),
      "imei": base.dataWithoutToken.timeStamp
    };
    return headers;
  },
  //传入后端的一些数据
  that: this,
  data: {
    clientType: 6, //客户端类型
    clientVersion: '1.4.2', //版本
    timeStamp: (function() {
      var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var str = '';
      for (var i = 0; i < 10; i++) {
        str += ls[Math.floor(Math.random() * 26)];
      }
      return str + new Date().getTime();
    })(), //时间戳
    token: (function() { //获取本地存储中的token，没有为空字符串
      function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return "";
      }
      var token = GetQueryString("app")
      if (token != "") {
        window.localStorage.setItem("token", token)
      }
      return localStorage.getItem('token') ? localStorage.getItem('token') : '';
    })()
  },
  //随机返回两个字母

  // 传入后端的一些数据 (不需要token)
  dataWithoutToken: {
    clientType: 6, //客户端类型
    clientVersion: '1.4.2', //版本
    timeStamp: (function() {
      var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var str = '';
      for (var i = 0; i < 10; i++) {
        str += ls[Math.floor(Math.random() * 26)];
      }
      return str + new Date().getTime();
    })() //时间戳
  },
  inLocalStorage: function() { //token载入缓存
    var token = GetQueryString("app") //获取token
    if (token != "") {
      localStorage.setItem("token", token)
    } else if (token == "") {
      token = localStorage.getItem("token")
      if (token == "") {
        mui.alert("未登录")
      }
    }
  },
  getUserType: function() { //usertpye获取载入缓存
    var useRType = GetQueryString("userType")
    if (useRType != "") {
      window.localStorage.setItem("userType", useRType)
    }
  },
  //校验手机号
  checkPhone: function(a) {
    if (!(/^1[3456789]\d{9}$/.test(a)) && a != "") {
      mui.toast("手机号码格式错误", { duration: 3000, type: 'div' })
      return false
    } else if (a == "") {
      mui.toast("请输入手机号码", { duration: 3000, type: 'div' });
      return false
    } else {
      return true;
    }
  }, //校验密码 不能低于6位高于20位 字母和数字组合
  checkPword: function(pw) {
    if (!(/^[A-Za-z0-9]{6,20}$/.test(pw)) && pw != "") {
      mui.toast("登录密码为6-20位字母和数字组合，请校验", { duration: 3000, type: 'div' })
      return false;
    } else if (pw == "") {
      mui.toast("请输入登录密码", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true;
    }
  }, //校验短信验证码
  checkSms: function(sms) {
    if (!(/^\d{4}$/.test(sms)) && sms != "") {
      mui.toast("短信验证码格式错误", { duration: 3000, type: 'div' });
      return false;
    } else if (sms == "") {
      mui.toast("请输入短信验证码", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true;
    }
  },
  //校验真实姓名
  checkName: function(name) {
    if (!(/^[\u4e00-\u9fa5]{2,4}$/.test(name)) && name != "") {
      mui.toast("真实姓名格式错误", { duration: 3000, type: 'div' })
      return false
    } else if (name == "") {
      mui.toast("请输入真实姓名", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true
    }
  },
  //校验身份证号
  checkidNo: function(id) {
    if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id)) && id != "") {
      mui.toast("身份证号格式错误", { duration: 3000, type: 'div' })
      return false
    } else if (id == "") {
      mui.toast("请输入身份证号", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true
    }
  },
  //校验银行卡号
  checkicNo: function(ic) {
    if (!(/^[0-9]{16,19}$/.test(ic)) && ic != "") {
      mui.toast("银行卡号格式错误", { duration: 3000, type: 'div' })
      return false
    } else if (ic == "") {
      mui.toast("请输入银行卡号", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true
    }
  }, //校验阿里滑动验证
  checkSession: function(session) {
    if (session == "") {
      mui.toast("请通过滑动验证", { duration: 3000, type: 'div' });
      return false;
    } else {
      return true
    }
  },
  //去空处理
  trimEmpty: function(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
  },
  isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1, //android终端
  isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
}

window.base = base;
/* AMD Export */
if (typeof(module) !== 'undefined') {
  module.exports = window.base;
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    'use strict';
    return window.base;
  });
}
