var CryptoJS = require("crypto-js");
var base = {
  DES3: require("./3DES"),
  errorStr: "服务器出错了，请稍后再试",
  apiStr: "/api",
  secretKey: (function() {
    /* return localStorage.getItem("secretKey")
      ? localStorage.getItem("secretKey")
      : "7356aec60f0aa519b14e45b065c098b3"; */
    if (navigator.userAgent.indexOf("xglc_android") > -1) {
      return "288ed3a47865289d552d8643724560ce";
    } else if (navigator.userAgent.indexOf("xglc_iOS") > -1) {
      return "b2fcd84b66a08fd390d93a12f12ecc56";
    } else {
      return "7356aec60f0aa519b14e45b065c098b3";
    }
  })(),

  desKey: "88d40d8bbbb6856eba38995b635fd04f",
  //设置设备码并存入本地存储
  setImei: function() {
    localStorage.setItem("_imei", base.data.timeStamp);
  },
  //移除设备码
  removeImei: function() {
    localStorage.removeItem("_imei");
  },
  //获取设备码
  getImei: function() {
    return localStorage.getItem("_imei") ? localStorage.getItem("_imei") : "";
  },
  // 加密串方法
  getPostStr: function(obj) {
    //判断有没有加密方法
    if (
      typeof CryptoJS.HmacSHA256 == "function" &&
      typeof CryptoJS.enc.Base64.stringify == "function"
    ) {
      var timeStamp = base.data.timeStamp,
        keyArr = [],
        o = obj,
        signStr = "";
      if (o) {
        for (var n in base.data) o[n] = base.data[n];
      } else {
        o = base.data;
      }
      for (var k in o) keyArr.push(k);

      keyArr.sort();
      for (var i = 0, l = keyArr.length; i < l; i++)
        signStr += keyArr[i] + "=" + o[keyArr[i]] + "&";
      signStr = signStr.substr(0, signStr.length - 1);
      signStr = CryptoJS.HmacSHA256(signStr, base.secretKey);
      return CryptoJS.enc.Base64.stringify(signStr);
    } else {
      throw new Error("参数错误");
    }
  },
  // 加密串方法 (不带token加密)
  getPostStrWithoutToken: function(obj) {
    //判断有没有加密方法
    if (
      typeof CryptoJS.HmacSHA256 == "function" &&
      typeof CryptoJS.enc.Base64.stringify == "function"
    ) {
      var timeStamp = base.dataWithoutToken.timeStamp,
        keyArr = [],
        o = obj,
        signStr = "";
      if (o) {
        for (var n in base.dataWithoutToken) o[n] = base.dataWithoutToken[n];
      } else {
        o = base.dataWithoutToken;
      }
      for (var k in o) keyArr.push(k);
      keyArr.sort();
      for (var i = 0, l = keyArr.length; i < l; i++)
        signStr += keyArr[i] + "=" + o[keyArr[i]] + "&";
      signStr = signStr.substr(0, signStr.length - 1);
      signStr = CryptoJS.HmacSHA256(signStr, base.secretKey);
      return CryptoJS.enc.Base64.stringify(signStr);
    } else {
      throw new Error("参数错误");
    }
  },
  //带token -- headers
  ajaxHeadersWithToken: function(obj) {
    var headers = {
      clientType: base.data.clientType,
      clientVersion: base.data.clientVersion,
      timeStamp: base.data.timeStamp,
      sign: base.getPostStr(obj),
      token: base.data.token,
      imei: localStorage.getItem("imei")
        ? localStorage.getItem("imei")
        : base.data.timeStamp
    };
    return headers;
  },
  //不带token --headers
  ajaxHeaderWithoutToken: function(obj) {
    var headers = {
      clientType: base.dataWithoutToken.clientType,
      clientVersion: base.dataWithoutToken.clientVersion,
      timeStamp: base.dataWithoutToken.timeStamp,
      sign: base.getPostStrWithoutToken(obj),
      imei: localStorage.getItem("imei")
        ? localStorage.getItem("imei")
        : base.data.timeStamp
    };
    return headers;
  },
  //传入后端的一些数据
  that: this,
  data: {
    clientType: (function() {
      if (navigator.userAgent.indexOf("xglc_android") > -1) {
        return "2";
      } else if (navigator.userAgent.indexOf("xglc_iOS") > -1) {
        return "1";
      } else {
        return "3";
      } //客户端类型
    })(),
    clientVersion: "1.5.0", //版本
    timeStamp: (function() {
      var ls = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      var str = "";
      for (var i = 0; i < 10; i++) {
        str += ls[Math.floor(Math.random() * 26)];
      }
      return str + new Date().getTime();
    })(), //时间戳
    token: (function() {
      //获取本地存储中的token，没有为空字符串
      function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return "";
      }
      var token = GetQueryString("app");
      if (token != "") {
        window.localStorage.setItem("token", token);
      }
      return localStorage.getItem("token") ? localStorage.getItem("token") : "";
    })()
  },
  //随机返回两个字母
  // 传入后端的一些数据 (不需要token)
  dataWithoutToken: {
    clientType: (function() {
      if (navigator.userAgent.indexOf("xglc_android") > -1) {
        return "2";
      } else if (navigator.userAgent.indexOf("xglc_iOS") > -1) {
        return "1";
      } else {
        return "3";
      } //客户端类型
    })(),
    clientVersion: "1.5.0", //版本
    timeStamp: (function() {
      var ls = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ];
      var str = "";
      for (var i = 0; i < 10; i++) {
        str += ls[Math.floor(Math.random() * 26)];
      }
      return str + new Date().getTime();
    })()
  },
  inLocalStorage: function() {
    //token载入缓存
    var token = GetQueryString("app"); //获取token
    if (token != "") {
      localStorage.setItem("token", token);
    } else if (token == "") {
      token = localStorage.getItem("token");
      if (token == "") {
        mui.alert("未登录");
      }
    }
  },
  //校验手机号
  checkPhone: function(a) {
    if (!/^1[3456789]\d{9}$/.test(a) && a != "") {
      mui.toast("手机号码格式错误", { duration: 3000, type: "div" });
      return false;
    } else if (a == "") {
      mui.toast("请输入手机号码", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  }, //校验手机号 登录专用
  checkLoginPhone: function(a) {
    if (!/^1[3456789]\d{9}$/.test(a) && a != "") {
      mui.toast("手机号或密码错误", { duration: 3000, type: "div" });
      return false;
    } else if (a == "") {
      mui.toast("手机号或密码错误", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  }, //校验修改或忘记密码 不能低于6位高于20位 字母和数字组合
  checkPword: function(pw) {
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(pw) && pw != "") {
      mui.toast("密码需为6~20位，至少含字母、数字", {
        duration: 3000,
        type: "div"
      });
      return false;
    } else if (pw == "") {
      mui.toast("密码需为6~20位，至少含字母、数字", {
        duration: 3000,
        type: "div"
      });
      return false;
    } else {
      return true;
    }
  }, //校验登录密码 不能低于6位高于20位 字母和数字组合
  checkLoginPword: function(pw) {
    if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
      mui.toast("手机号或密码错误", {
        duration: 3000,
        type: "div"
      });
      return false;
    } else if (pw == "") {
      mui.toast("手机号或密码错误", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  },
  checkPwordOld: function(pw) {
    if (!/^[A-Za-z0-9]{6,20}$/.test(pw) && pw != "") {
      mui.toast("旧密码需为6~20位，至少含字母、数字", {
        duration: 3000,
        type: "div"
      });
      return false;
    } else if (pw == "") {
      mui.toast("旧密码为空", {
        duration: 3000,
        type: "div"
      });
      return false;
    } else {
      return true;
    }
  },
  //校验短信验证码
  checkSms: function(sms) {
    if (!/^\d{4,6}$/.test(sms) && sms != "") {
      mui.toast("短信验证码格式错误", { duration: 3000, type: "div" });
      return false;
    } else if (sms == "") {
      mui.toast("请输入短信验证码", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  },
  //校验真实姓名
  checkName: function(name) {
    if (!/^[\u4e00-\u9fa5]{2,4}$/.test(name) && name != "") {
      mui.toast("真实姓名格式错误", { duration: 3000, type: "div" });
      return false;
    } else if (name == "") {
      mui.toast("请输入真实姓名", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  },
  //校验身份证号
  checkidNo: function(id) {
    if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(id) && id != "") {
      mui.toast("身份证号格式错误", { duration: 3000, type: "div" });
      return false;
    } else if (id == "") {
      mui.toast("请输入身份证号", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  },
  //校验银行卡号
  checkicNo: function(ic) {
    if (!/^[0-9]{16,19}$/.test(ic) && ic != "") {
      mui.toast("银行卡号格式错误", { duration: 3000, type: "div" });
      return false;
    } else if (ic == "") {
      mui.toast("请输入银行卡号", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  }, //校验阿里滑动验证
  checkSession: function(session) {
    if (session == "") {
      mui.toast("请通过滑动验证", { duration: 3000, type: "div" });
      return false;
    } else {
      return true;
    }
  },
  //去空处理
  trimEmpty: function(str) {
    return str.replace(/(^\s+)|(\s+$)/g, "");
  },
  rateHikeMath: function(rate, time, amount) {
    //计算加息金额，单位日息保留到18位小数
    var yearRate = ((rate / 100) * 10000) / 360;
    yearRate = Math.floor(yearRate * 100000000000000) / 1000000000000000000;
    var rateHike = yearRate * time * amount;
    rateHike = Math.floor(rateHike * 100) / 100;
    return rateHike;
  },
  //初始化bridage -- Android
  connectWebViewJavascriptBridge: function(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function() {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  },
  //初始化bridage -- IOS
  setupWebViewJavascriptBridge: function(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  },
  //判断客户端类型
  getClientType: function() {
    var type = navigator.userAgent.split("xglc")[1];
    type = type ? type : "wap";
    var o = { type: "", version: "" };
    //xglc_android_1.0 xglc_iOS_1.0
    if (type.indexOf("_") > -1) {
      var strArr = type.split("_");
      o.version = strArr[2];
      if (strArr[1] == "android") o.type = "android";
      if (strArr[1] == "iOS") o.type = "iOS";
    } else {
      o.type = type;
    }
    return o;
  },
  wxShare: function(wx, shareInfo, _config) {
    wx.config({
      debug: _config.debug,
      appId: _config.appId, // 必填，公众号的唯一标识
      timestamp: _config.timestamp, // 必填，生成签名的时间戳
      nonceStr: _config.nonceStr, // 必填，生成签名的随机串
      signature: _config.signature, // 必填，签名
      jsApiList: _config.jsApiList // 必填，需要使用的JS接口列表
    });
    wx.ready(function() {
      wx.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl // 分享图标
      });
      wx.onMenuShareAppMessage({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl // 分享图标
      });
      wx.onMenuShareQQ({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl // 分享图标
      });
      wx.onMenuShareWeibo({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl // 分享图标
      });
      wx.onMenuShareQZone({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc, // 分享描述
        link: shareInfo.link, // 分享链接
        imgUrl: shareInfo.imgUrl // 分享图标
      });
    });
  },
  appVer: function() {
    if (navigator.userAgent.indexOf("xglc_android") > -1) {
      var ver = navigator.userAgent
        .split("xglc_android_")[1]
        .replace(/[.]/g, "");
      if (ver.length < 4) {
        ver = ver + "0";
      }
      return ver;
    } else if (navigator.userAgent.indexOf("xglc_iOS") > -1) {
      var ver = navigator.userAgent.split("xglc_iOS_")[1].replace(/[.]/g, "");
      if (ver.length < 4) {
        ver = ver + "0";
      }
      return ver;
    }
  },
  //是否调用过bridge.init
  isBridgeInit: false,
  isAndroid: navigator.userAgent.indexOf("xglc_android") > -1, //android终端
  isiOS: navigator.userAgent.indexOf("xglc_iOS") > -1 //ios终端
};

window.base = base;
/* AMD Export */
if (typeof module !== "undefined") {
  module.exports = window.base;
} else if (typeof define === "function" && define.amd) {
  define([], function() {
    "use strict";
    return window.base;
  });
}
