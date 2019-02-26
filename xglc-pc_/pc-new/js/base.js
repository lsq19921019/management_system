var base = {
    errorStr: "服务器出错了，请稍后再试",
    apiStr: "/api",
    //PC
    secretKey: '3cf8dec999164de3a334e3488b04aaf6', //秘钥
    desKey: '1492bd85794e4217a82bf145fa1dc68e', //3DES密钥
    //移动端
    //  secretKey: '7356aec60f0aa519b14e45b065c098b3', //秘钥
    //  desKey: '88d40d8bbbb6856eba38995b635fd04f', //3DES密钥
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
            // "imei": base.getImei()
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
    data: {
        clientType: 6, //客户端类型
        //      clientType: 3, //客户端类型
        clientVersion: '1.0', //版本
        timeStamp: (function() {
            var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var str = '';
            for (var i = 0; i < 10; i++) {
                str += ls[Math.floor(Math.random() * 26)];
            }
            return str + new Date().getTime();
        })(), //时间戳
        token: (function() { //获取本地存储中的token，没有为空字符串
            return localStorage.getItem('_token') ? localStorage.getItem('_token') : '';
        })()
    },
    //随机返回两个字母

    // 传入后端的一些数据 (不需要token)
    dataWithoutToken: {
        //      clientType: 3, //客户端类型
        clientType: 6, //客户端类型
        clientVersion: '1.0', //版本
        timeStamp: (function() {
            var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var str = '';
            for (var i = 0; i < 10; i++) {
                str += ls[Math.floor(Math.random() * 26)];
            }
            return str + new Date().getTime();
        })() //时间戳
    },
    //校验手机号
    checkPhone: function(a) {
        if (!(/^1[3456789]\d{9}$/.test(a))) {
            mui.alert("手机号码有误，请重填");
            return false;
        } else {
            return true;
        }
    },
    //去空处理
    trimEmpty: function(str) {
        return str.replace(/(^\s+)|(\s+$)/g, "");
    },
    GetQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return "";
    }

}