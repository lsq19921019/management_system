var DES3 = require('./3DES');
var CryptoJS = require('crypto-js');
var MobileDetect = require('mobile-detect');

var Base = {
    qjjSourceCode : 'ios_qianjinjin',  //钱金金app内 login统一添加/ios_qianjinjin
    downloadUrl : {
        //ios : 'https://itunes.apple.com/cn/app/%E5%BF%AB%E9%93%B6%E7%A4%BE%E5%8C%BA/id1444401990?mt=8',
        ios: 'https://itunes.apple.com/app/id1445837137',
        //android : 'https://ky-app.oss-cn-shenzhen.aliyuncs.com/apk/ky-official-2.0.2-release.apk'
        android : 'https://ky-app.oss-cn-shenzhen.aliyuncs.com/apk/rrdk-official-release.apk'
    },  //人人贷款下载地址
    //秘钥
    secretKey: '288ed3a47865289d552d8643724560ce',
    //3DES密钥
    desKey: '6391a51e7d511131bcb222f1a4921071',
    //版本号
    version : '2.2',
    //正则表达式
    regs : {
        mobile : /^1[3456789]\d{9}$/,  //手机号
        pwd : /[\d\w]{6,20}/,  //密码
        code : /^\d{4}$/,  //图片验证码&短信验证码均为4位数字
        name : /^[\u4e00-\u9fa5]{2,4}$/,  //名字（汉字）
        msgCode : /^\d{6}$/,  //手机验证码
        idCard : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,  //身份证
        email : /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,  //邮箱
        bankNo : /^([1-9]{1})(\d{15}|\d{18})$/,  //银行卡
        // telPhone : /(^\d{3,4}\-?\d{7,8}\-?\d{6}$)|(^\d{3,4}\-?\d{7,8}$)/,  //住宅电话
        telPhone : /^\d{3,4}\-?\d{7,8}((\-?\d{6})|\d{0})$/,  //住宅电话
        monthSalary:/^[1-9]\d*$/, //月收入;
        phoZone : /^\d{3,5}$/,
        phoneNo : /^\d{6,8}$/,
        phoExtend : /^\d{0,5}$/,

    },

    //加密用到的数据
    data : {
        clientType: 3, //客户端类型
        clientVersion: '1.0', //版本
        timeStamp: (function() {
            var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var str = '';
            for (var i = 0; i < 10; i++) {
                str += ls[Math.floor(Math.random() * 26)];
            }
            return str + new Date().getTime();
        })()
    },

    /**
     * create 田鹏伟
     * date 2018-08-28
     * @param1 {Number} 是否带token：1带，0不带
     * @param2 {Object} 需要加密传递给后端的额外参数
     * desc 生成ajax交互headers对象
     */
    initAjaxHeader : function(type,obj) {
        var headers = {
            "clientType": Base.data.clientType,
            "clientVersion": Base.data.clientVersion,
            "timeStamp": Base.data.timeStamp,
            "sign": Base.getPostStr(type,obj),
            "imei": Base.data.timeStamp
        };
        if(type == 1){
            headers.token = localStorage.getItem('_token') ? localStorage.getItem('_token') : '';
        };
        return headers;
    },

    /**
     * create 田鹏伟
     * date 2018-08-28
     * @param1 {Number} 是否带token：1带，0不带
     * @param2 {Object} 需要加密传递给后端的额外参数
     * desc 生成加密串
     */
    getPostStr :function(type,obj) {
        var _data = Base.data;
        //如果不带token则移除o.token
        if(type == 1) {
            _data.token = localStorage.getItem('_token') ? localStorage.getItem('_token') : '';
        };
        //判断有没有加密方法
        if (typeof CryptoJS.HmacSHA256 == 'function' && typeof CryptoJS.enc.Base64.stringify == 'function') {
            var timeStamp = _data.timeStamp,
                keyArr = [],
                o = obj,
                signStr = '';
            if (o) {
                for (var n in _data) {
                    o[n] = _data[n];
                };
            } else {
                o = _data;
            }
            for (var k in o) keyArr.push(k);
            keyArr.sort();
            for (var i = 0, l = keyArr.length; i < l; i++) signStr += keyArr[i] + '=' + o[keyArr[i]] + '&';
            signStr = signStr.substr(0, signStr.length - 1);
            signStr = CryptoJS.HmacSHA256(signStr, Base.secretKey);
            return CryptoJS.enc.Base64.stringify(signStr);
        } else {
            throw new Error('参数错误');
        }
    },
      //判断客户端类型
    getClientType:function() {
        var type = navigator.userAgent.split("kuaiyin")[1];
        console.log(navigator.userAgent)
        type = type ? type : "wap";
        var o = { type: "", version: "" };
        //kuaiyin_android_1.0 kuaiyin_iOS_1.0
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
    //判断客户端类型
    getClientType_ttj:function() {
        var type = navigator.userAgent.split("tiantianjie")[1];
        console.log(navigator.userAgent)
        type = type ? type : "wap";
        var o = { type: "", version: "" };
        //kuaiyin_android_1.0 kuaiyin_iOS_1.0
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
    interactiveWithApp: function(appFncName, paramsFromWap) {
        return new Promise(function (resolve, reject) {
        var typeObject = Base.getClientType();
        var type = typeObject.type;
        var version = typeObject.version;
        console.log(version)
        // version.length > 0
        if (version.length > 0) {
            //type == "iOS"
            if (type == "iOS") {
            Base.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler(appFncName, { param: paramsFromWap }, function(
                response
                ) {
                //客户端返回参数response，json字符串类型{"status":"0","msg":"success",result:""}
                resolve(response);
                });
            });
            } else if (type == "android") {
            Base.connectWebViewJavascriptBridge(function(bridge) {
                if (!Base.isBridgeInit) {
                bridge.init(function(message, responseCallback) {});
                }
                Base.isBridgeInit = true;
                window.WebViewJavascriptBridge.callHandler(
                    appFncName,
                    { param: paramsFromWap },
                    function(response) {   
                        resolve(response);
                    }
                );
            });
            }
        } else {
            //wap端直接返回特殊标识，方便单独处理
            resolve("wap");
        }
        });
    },
    interactiveWithApp_ttj: function(appFncName, paramsFromWap) {
        return new Promise(function (resolve, reject) {
        var typeObject = Base.getClientType_ttj();
        var type = typeObject.type;
        var version = typeObject.version;
        console.log(version)
        // version.length > 0
        if (version.length > 0) {
            //type == "iOS"
            if (type == "iOS") {
            Base.setupWebViewJavascriptBridge(function(bridge) {
                bridge.callHandler(appFncName, { param: paramsFromWap }, function(
                response
                ) {
                //客户端返回参数response，json字符串类型{"status":"0","msg":"success",result:""}
                resolve(response);
                });
            });
            } else if (type == "android") {
            Base.connectWebViewJavascriptBridge(function(bridge) {
                if (!Base.isBridgeInit) {
                bridge.init(function(message, responseCallback) {});
                }
                Base.isBridgeInit = true;
                window.WebViewJavascriptBridge.callHandler(
                    appFncName,
                    { param: paramsFromWap },
                    function(response) {   
                        resolve(response);
                    }
                );
            });
            }
        } else {
            //wap端直接返回特殊标识，方便单独处理
            resolve("wap");
        }
        });
    },
    //是否调用过bridge.init
    isBridgeInit: false,
    //设置登录回跳页面路径到本地存储
    setSourceUrl :function() {
        var pageUrl = location.pathname;
        if(location.search) pageUrl += location.search;
        localStorage.setItem('sourePage',pageUrl);
        location.href = '/login';
    },
    //根据手机浏览器判断手机系统
    getSys : function() {
        var u = navigator.userAgent;
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
            return 'Android';
        } else if(u.indexOf('iPhone') > -1) {
            return 'Ios';
        }
        return null;
    },
    //根据rem反推px
    calcPx : function(n) { 
        var b = document.documentElement.clientWidth;
        b = b>750?750:b; 
        var c = b/750*100;
        return n * c;
    },
    /**
     * create 田鹏伟
     * date 2018-10-27
     * @param1 {vue实例} 
     * @param2 {Object} 
     * @param3 {随便一个字符串} 如果传第三个参数则不跳转，否则跳转
     */
    setIframePageInfo : function(_this,obj) {
        localStorage.setItem('iframeSrc',obj.url);
        localStorage.setItem('iframeTitle',obj.title);
        if(!arguments[2]) _this.$router.push({ name : 'Iframe' });
    },
    /**
     * 
     * @param {String} 下拉框显示的文案
     * @param {Array} 下拉框显示的文案所在的字典数组
     */
    getVkey: function(txt,obj) {
        var vkey = '';
        for(var k in obj) {
            if(txt == obj[k].value) {
                vkey = obj[k].vkey;
                break;
            }
        }
        return vkey;
    },
    getValue: function(txt,obj) {
        var value = '';
        for(var k in obj) {
            if(txt == obj[k].vkey) {
                value = obj[k].value;
                break;
            }
        }
        return value;
    },
    //根据浏览器判断ios 安卓
    getSysType:function() {
        var u = navigator.userAgent;
        // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS) {
            return 'IOS';
        }
        return 'Android';
    },
    getResiterInfo:function() {
        let _this = this;
        this.interactiveWithApp('getAppInfo',{}).then(data=>{
             if(data == 'wap') {
                 console.log('wap','getAppInfo');
             } else {
                 if(typeof data == 'string') data = JSON.parse(data);
                 console.log('getAppInfo2',data);
                 
             }
         });
     },
     mobileType:function(){
        //判断数组中是否包含某字符串
        Array.prototype.contains = function(needle) {
            for (i in this) {
                if (this[i].indexOf(needle) > 0)
                    return i;
            }
            return -1; 
        }
        let device_type = navigator.userAgent;
        var md = new MobileDetect(device_type);
        var os = md.os();//获取系统
        var model = "";
        if (os == "iOS") {//ios系统的处理 
            os = md.os() + md.version("iPhone");
            model = md.mobile(); 
        } else if (os == "AndroidOS") {//Android系统的处理 
            os = md.os() + md.version("Android"); 
            var sss = device_type.split(";"); 
            var i = sss.contains("Build/");
            if (i > -1) {
                model = sss[i].substring(0, sss[i].indexOf("Build/")); 
            }
        } 
        return model;
    }
};
module.exports = Base;