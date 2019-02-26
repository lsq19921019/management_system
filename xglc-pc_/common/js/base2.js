/*
 edit by wangzhiyong  date:2017-06-07 desc:修改了正则
 */
var base = {
    // 正则表达式
    regs: {
        mobile: /^1[34578]\d{9}$/, //手机号
      /*
       add wangzhiyong
       date:2017-06-07
       desc：对手机号码的验证进行修改
       移动号段：
       134 135 136 137 138 139 147 150 151 152 157 158 159 172 178 182 183 184 187 188
       联通号段：
       130 131 132 145 155 156 171 175 176 185 186
       电信号段：
       133 149 153 173 177 180 181 189
       */
      mobileNew: /^(((13[0-9]{1})|(14[579]{1})|(15[0-9]{1})|(17[1235678]{1})|(18[0-9]{1}))+\d{8})$/,

      id: /^\d{17}(x|\d)$/i, //身份证
      /*
       add by wangzhiyong
       身份证号码要进行效验
       */
      idcard:function (value) {//身份证号码
        //15位和18位身份证号码的正则表达式
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if (regIdCard.test(value)) {
          if (value.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
              idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = value.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
              if (idCardLast == "X" || idCardLast == "x") {
                return true;
              } else {
                return false;
              }
            } else {
              //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if (idCardLast == idCardY[idCardMod]) {
                return true;
              } else {
                return false;
              }
            }
          }
        } else {
          return false;
        }


      },
        id6: /^\d{5}(x|\d)$/i, //身份证后六位
        rechargeNum: /(^[123456789]\d*$)|(^[123456789]\d*\.\d{1,2}$)/, //充值金额
        buyNum: /(^[123456789]\d*$)/, //充值金额
        bankNo: /^\d{16,19}$/, //银行卡号码
        isUserName: /^[\u4e00-\u9fa5 ]||[a-z|A-Z|0-9]{0,}$/, //用户名验证--汉字、数字和英文大小写
        // isPassword: /[a-z|A-Z|0-9]{6,20}$/, // 登录密码验证--数字和英文大小写
        isPassword:/^.{6,20}$/,// 登录密码验证--6-20位
        isRealName: /^[\u4E00-\u9FA5\uF900-\uFA2D]{2,7}$/, //真实姓名验证
        messageCode: /^\d{4,6}/, //短信验证码--4-6位纯数字
        bankCode: /^(\d{16,19})$/, //银行卡号 16-19位数字
        realName:/^[\u4E00-\u9fa5\.\s]{2,50}$|^[a-z\.\s]{2,50}$/i, //港澳台用户姓名为纯汉字或者纯英文，中间带小数点或空格最大50个
        idCode:/[a-z0-9]{1,20}/i, //港澳通行证证件号码
        updatePhoto:/\.(png|jpg|jpeg|bmp)$/i, //上传图片的格式
        default: /default/
    },
    //弹窗提示语
    tips: {
        tip1: "请求失败，请稍后再试。", //请求ajax失败
        tip2: '短信验证码已发送至您的手机，请注意查收。' //发送短信成功提示语
    },
    //接口地址
    apiPath : (function() {
        var path = '/api',
            origin = location.origin,
            origins = [
            'https://wap.rrjc.com',  //生产环境
            'https://mobile.rrjc.com',  //域名二
            'https://102mobile.rrjc.com',  //预发布环境
            'https://23mobile.szrrjc.com',  //23测试环境
            'http://23mobile.szrrjc.com',  //23测试环境
            'http://109mobile.szrrjc.com', //109测试环境
            'http://108mobile.szrrjc.com',  //108测试环境
            'http://114mobile.szrrjc.com',  //114测试环境
             'http://116mobile.szrrjc.com',  //116测试环境

        ];
        //如果页面、api同域则返回location.origin +'/api';
        for(let i=0,len=origins.length; i<len; i++) {
            if(origin == origins[i]) {
                return origin + path;
                break;
            }
        }
        //根据测试要求使用相应api地址
        return 'http://192.168.3.23'+ path;
    })(),
    //传入后端的一些数据
    data: {
        clientType: 3, //客户端类型
        clientVersion: 'V3.0.0', //版本
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
        clientType: 3, //客户端类型
        clientVersion: 'V3.0.0', //版本
        timeStamp: (function() {
                var ls = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                var str = '';
                for (var i = 0; i < 10; i++) {
                    str += ls[Math.floor(Math.random() * 26)];
                }
                return str + new Date().getTime();
            })() //时间戳
    },
    postUrl: 'http://192.168.3.247/UserInfo', //给xx发送local stora
    secretKey: '7356aec60f0aa519b14e45b065c098b3', //秘钥
    desKey: '88d40d8bbbb6856eba38995b635fd04f', //3DES密钥
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
    // 修改在IOS微信中 title无法修改的问题
    setTitle: function(t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//www.rrjc.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
            setTimeout(function() {
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);
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
    //项目剩余金额不足时传递 0 默认 1项目剩余金额不足时传递
    overBuySign: 0,
    //ajax
    ajax: function(obj) {
        $.ajax({
            url: obj.url,
            async: obj.async || false, //默认同步请求
            type: obj.type || 'post', //默认post
            data: obj.data || {}, //默认无入参
            dataType: obj.dataType || 'json',
            headers: obj.headers,
            success: function(result) {
                if (result.status == '0') {
                    eval(base.getHeadToken); //每次请求判断服务器是否返回token
                    obj.success(obj._this, result);
                }
                //token过期，重新登录
                else if (result.status == '-3') {
                    // base.gotoLogin();
                    base.gotoAppLogin(function(){

                        base.gotoLogin();
                    });
                }
                //如果未开户
                else if (result.status == '0030') {
                    if (obj.gotoWkh) obj.gotoWkh(obj._this, result);
                    if (obj.wkhDtb) obj.wkhDtb(obj._this, result); //定投宝
                    if (obj.gotoZqWkh) obj.gotoZqWkh(obj._this, result); //债权
                    if (obj.wkhCz) obj.wkhCz(obj._this, result); //充值
                }
                //如果未激活0031
                else if (result.status == '0031') {
                    if (obj.gotoWjh) obj.gotoWjh(obj._this, result);
                    if (obj.wjhDtb) obj.wjhDtb(obj._this, result);
                    if (obj.Zqwjh) obj.Zqwjh(obj._this, result);
                }
                //用户未开通存银行管购买授权0032
                else if (result.status == '0032') {
                    if (obj.sqDtb) obj.sqDtb(obj._this, result);
                    if (obj.gotoSq) obj.gotoSq(obj._this, result);
                    if (obj.gotoZqSq) obj.gotoZqSq(obj._this, result);
                }
                //未绑定银行卡，弹框去绑卡
                else if (result.status == '0033') {
                    if (obj.bindingCard) {
                        obj.bindingCard(obj._this, result);
                    } else if (obj.bkDtb) {
                        obj.bkDtb(obj._this, result);
                    } else {
                        if ($('#JS_dialogBg')) {
                            $('#JS_dialogBg').remove();
                        };
                        base.ajaxDialog({
                            msg: result.msg,
                            fnc: function() {
                                $('.dialog_msg').css('text-align', 'center');
                                $('#J_dialogBtnsR').click(function() {
                                    base.setWapLastPage(location.pathname);
                                    location.href = '/BindBankCard';
                                });
                            }
                        });
                    }
                }
                //银行卡信息不正确，弹框去解绑
                else if (result.status == '0034') {
                    if (obj.unbundlingCard) {
                        obj.unbundlingCard(obj._this, result);
                    } else if (obj.jbkDtb) {
                        obj.jbkDtb(obj._this, result);
                    } else if (obj.jbkZq) {
                        obj.jbkZq(obj._this, result);
                    } else {
                        if ($('#JS_dialogBg')) {
                            $('#JS_dialogBg').remove();
                        };
                        base.ajaxDialog({
                            msg: '您的银行卡信息不正确，请先解绑后再绑定新卡进行操作。',
                            fnc: function() {
                                $('#J_dialogBtnsR').click(function() {
                                    location.href = '/UnBindValidate';
                                });
                            }
                        });
                    }
                }
                // 余额不足的情况下跳转到充值页面0042
                else if (result.status == '0042') {
                    if (obj.czDtb) {
                        obj.czDtb(obj._this, result);
                    }
                    if (obj.czZq) {
                        obj.czZq(obj._this, result);
                    } //else {
                    // if ($('#JS_dialogBg')) {
                    //     $('#JS_dialogBg').remove();
                    // };
                    // base.ajaxDialog({
                    //     msg: result.msg,
                    //     fnc: function() {
                    //         $('#J_dialogBtnsR').text('充值').click(function() {
                    //             location.href = '/Recharge';
                    //         });
                    //     }
                    // });
                    //}
                } else if (result.status === '0043') {
                    if (obj.dtb43) obj.dtb43(obj._this, result);
                /*}else if(result.status == '0086'){  //已经提交了三次预约投资申请
                    if(obj.reserveNum) obj.reserveNum(obj._this, result);
                }else if(result.status == '0087'){//未在有效期购买预约投资项目
                     if(obj.unReserve) obj.unReserve(obj._this, result);*/
                }
                //其他报错情况
                else {
                    if (obj.showTips) {
                        //允许显示错误
                        obj.showTips(obj._this, result);
                        return false;
                    }
                    if (obj.investFail) {
                        //投资失败跳转到失败页面并记录投资页面pathname
                        if(location.search.length >1){
                             localStorage.setItem('Investment_failure', location.pathname + location.search);
                            localStorage.setItem('Investment_failure_tips', result.msg);
                            location.href = '/InvestmentFailure';
                        }else{
                            localStorage.setItem('Investment_failure', location.pathname);
                            localStorage.setItem('Investment_failure_tips', result.msg);
                            location.href = '/InvestmentFailure';
                        }
                    } else {
                        new dialog().init(result.msg);
                    }
                }
            },
            error: obj.error || function() {
                new dialog().init(base.tips.tip1);
            },
            beforeSend: obj.beforeSend
        });
        //base.showToast1();
    },
    //ajax弹窗 that:vue实例；result:ajax返回的数据
    ajaxDialog: function(obj, that, result) {
        var o = {
            msg: '',
            title: '',
            btns: ['取消', '确定']
        };
        base.mergeObj(o, obj);
        new dialog().init({
            type: 'dialog',
            title: o.title,
            msg: o.msg,
            btns: o.btns,
            callBack: function() {
                $('#J_dialogBtnsL').css('color', '#4c516A');
                if (o.fnc) o.fnc();
            }
        });
    },
    /**
     * loading显示
     * type:loading,comlete
     *
     * base.showToast({
     *     type:'loading',
     *     text:'修改中...'
     * })
     */
    showToast: function(obj) {
        var doc = document,
            body = doc.body,
            toastCon = doc.getElementById('loadingToast'),
            toastTip = doc.getElementById('loading_text'),
            toastComplete = doc.getElementById('weui_icon_toast'),
            toastLoading = doc.getElementById('weui_loading');
        toastCon.style.display = obj.display || 'block';
        if (obj.type == 'loading') {
            toastLoading.style.display = 'block';
        }
        if (obj.type == 'complete') {
            toastComplete.style.display = 'block';
            setTimeout(function() {
                toastComplete.style.display = 'none';
                toastCon.style.display = 'none';
            }, 800);
        }
        if (obj.text) {
            toastTip.innerHTML = obj.text;
        }
    },
    /**
     * loading隐藏
     * base.removeToast('loading')
     */
    removeToast: function(obj) {
        var doc = document,
            body = doc.body,
            toastLoading = doc.getElementById('weui_loading'),
            toastCon = doc.getElementById('loadingToast');
        if (obj == 'loading') {
            toastLoading.style.display = 'none';
        }
        toastCon.style.display = 'none';
    },
    // 设置本地存储
    setlocalStorage: function(name, val) {
        localStorage.setItem(name, val);
    },
    /**
     * [localStorage description]
     * @type {Array}
     *  1、显示/隐藏资产：property_showProperty；
        2、token：_token;
        3、解绑银行卡手机：validate_mobile；
        4、使用的增值券id：property_prizeId；
        5、使用优惠券的类型：property_prizeType;
        6、银行卡id：validate_bankId;
        7、资产首页点击充值存入银行卡信息：property_bankInfo_r;
        8、资产首页点击提现存入银行卡&提现费率&免费次数信息：property_bankInfo_w;
        9、绑定真实姓名：bank_user;
        10.所属银行：bank_name;
        11、天天赚转出金额：property_edWithdraw;
        12、存管通回跳地址：_cgt_WapLastPage;
        13、定投宝投资红包信息：dtb_coupon;
        14、月月赚投资红包信息：yyz_couponAmount;
        15、月月赚购买金额：yyzBuyamount;
        16.投资成功投资金额：investMoney;
        17、定投宝投资页面信息：dtbItem_infor;
        18、投资失败记录投资页面地址：Investment_failure;
        19、投资失败记录后端失败提示：Investment_failure_tips;
        20、理财购买成功失败页面中继续购买按钮跳转链接:project_target;
        21、banner的分享号:_shareId
     */
    localStorages: [
        'property_showProperty',
        'validate_mobile',
        'property_prizeId',
        'property_prizeType',
        'validate_bankId',
        'property_bankInfo_r',
        'property_bankInfo_w',
        'bank_user',
        'bank_name',
        'property_edWithdraw',
        '_cgt_WapLastPage',
        'dtb_investRed',
        'yyz_couponAmount',
        'yyzBuyamount',
        'investMoney',
        'property_showProperty_usableSum',
        'pathName',
        'dtbItem_infor',  //当前投资的定投宝信息
        'dtb_Coupon',  //投资定投宝选择的红包信息
        'couponNumber',  //定投宝投资页面获取到的可使用的优惠数量
        'property_coupon_ico',  //资产页面>我的优惠红点提示
        'Investment_failure',
        'Investment_failure_tips',
        'dtbItem_pathName',
        'project_target'
    ],
    // 移除本地存储
    removelocalStorage: function(ls) {
        for (var i = 0, l = ls.length; i < l; i++) {
            localStorage.removeItem(ls[i]);
        }
    },
    //截取url参数(指定参数名)
    getQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    //验证手机号码
    checkPhoneNum: function(val) {
        var errorMsg;
        if (val == '') {
            errorMsg = '手机号码不能为空';
        } else if (!(base.regs.mobile).test(val)) {
            errorMsg = '请输入正确的手机号码';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //验证短信验证码
    checkMessageCode: function(val) {
        var errorMsg;
        if (val == '') {
            errorMsg = '短信验证码不能为空';
        } else if (val.length != 4) {
            errorMsg = '请输入正确的验证码';
        } else if (!(base.regs.messageCode).test(val)) {
            errorMsg = '请输入正确的验证码';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //验证登录密码
    checkLoginPwd: function(val) {
        var errorMsg;
        if (val == '') {
            errorMsg = '登录密码不能为空';
        } else if (!(base.regs.isPassword).test(val)) {
            errorMsg = '登录密码为6到20位字符，仅包含数字和英文大小写';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //验证两次密码是否一致
    checkSamePwd: function(val1, val2) {
        var errorMsg;
        if (val1 !== val2) {
            errorMsg = '两次密码不一致！请重新输入';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //验证是否勾选安全协议
    checkSelectBox: function(val) {
        var errorMsg;
        if (val == 0) {
            errorMsg = '请阅读并同意服务协议和注册协议';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //验证用户名
    checkUserName: function(val) {
        var errorMsg;
        if (val == '') {
            errorMsg = '用户名不能为空';
        } else if (!(base.regs.isUserName).test(val)) {
            errorMsg = '用户名仅支持汉字、数字和英文大小写，请重新输入';
        } else {
            errorMsg = '';
        }
        return errorMsg;
    },
    //登录状态失效，跳转登录页面带上页路径
    gotoLogin: function() {
        window.location.href = "/Login?lastPage=" + window.location.pathname +window.location.search;
    },
  /***
   *根据身份证号判断是否满18岁
   * @param {身份证号,string} idcard
   * @returns {string}
   */
  //判断是否满18岁
  is18: function(idcard) {
    //edit by wangzhiyong
    var birthdayResult=  base.birthday(idcard);//出生日期字符串格式
    var curDate=new Date();//当前日期
    var birthDate=birthdayResult?new Date(birthdayResult):new Date();//出生日期-日期格式
    return curDate.getFullYear()-birthDate.getFullYear()>18?true:curDate.getMonth()>birthDate.getMonth()?true:curDate.getDate()>=birthDate.getDate()?true:false;
  },
  /***
   *根据身份证号提取出生日期
   * @param {身份证号,string} id
   * @returns {string}
   */
  birthday:function (id) {
    var birthdayStr = null;//无效则返回null
    if (base.regs.idcard(id)) {
      if (id.length == 15) {//15位
      var  re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = id.match(re);
        birthdayStr = arrSplit[2] + "-" + arrSplit[3] + "-" + arrSplit[4];
      }
      else {//18位
      var  re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);//
        var arrSplit = id.toUpperCase().match(re);
        birthdayStr = arrSplit[2] + "-" + arrSplit[3] + "-" + arrSplit[4];
      }
    }
    return birthdayStr;
  },

    //合并object对象 obj2：合并源
    mergeObj: function(obj1, obj2) {
        for (var key in obj2) obj1[key] = obj2[key];
        return obj1;
    },
    // 传入后端的一些数据 (不需要token)
    dataWithoutToken: {
      clientType: 3, //客户端类型
      clientVersion: 'V3.0.0', //版本
      timeStamp: new Date().getTime() //时间戳
    },
    //如果未登录修改header
    checkIfLogin: function(obj) {
        if (base.data.token) {
            var header = {
                "clientType": base.data.clientType,
                "clientVersion": base.data.clientVersion,
                "timeStamp": base.data.timeStamp,
                "sign": base.getPostStr(obj),
                "token": base.data.token,
                "imei": base.data.timeStamp
                    // "imei": base.getImei()
            };
        } else {
            var header = {
                "clientType": base.dataWithoutToken.clientType,
                "clientVersion": base.dataWithoutToken.clientVersion,
                "timeStamp": base.dataWithoutToken.timeStamp,
                "sign": base.getPostStrWithoutToken(obj),
                "imei": base.dataWithoutToken.timeStamp
                    // "imei": base.getImei()
            };
        }
        return header;
    },
    /* 检查访问客户端方法 */
    checkAgent: function() {
        var u = navigator.userAgent,
            Agent = '';
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            Agent = 'Android';
        } else if (isiOS) {
            Agent = 'IOS';
        }
        return Agent;
    },
    //初始化bridage -- Android
    connectWebViewJavascriptBridge: function(callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge)
        } else {
            document.addEventListener(
                'WebViewJavascriptBridgeReady',
                function() {
                    callback(WebViewJavascriptBridge)
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
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    },
    cgt_lastPage: localStorage.getItem('_cgt_WapLastPage') ? localStorage.getItem('_cgt_WapLastPage') : '',
    //设置wap返回页面
    setWapLastPage: function(page) {
        localStorage.setItem('_cgt_WapLastPage', page);
    },
    //移除
    removeCgtPage: function() {
        localStorage.removeItem('_cgt_WapLastPage');
    },
    //设置存管通回跳链接
    setCgtHref: function(vm) {
        if (base.cgt_lastPage) {
            //url参数为app识别标识
            if(base.cgt_lastPage.indexOf("?")>-1)
                {
                        vm.cgtGoBack =base.cgt_lastPage+="&v=isWap";
                }
                    else{
                         vm.cgtGoBack = base.cgt_lastPage + '?v=isWap';
                    }
                
           
        }
    },
    //月月赚收益计算公式:输入金额/月份数/利率
    yyzCalc: function(joinAmount, months, interestRate) {
        var i = interestRate / 100 / 12; //月利率
        var val1 = joinAmount * i * Math.pow((1 + i), months);
        var val2 = Math.pow((1 + i), months) - 1;
        var monPay = Math.floor(val1 / val2 * 100) / 100; //每月还款
        //console.info(i+"-"+monPay);
        var monForRate = 0; //月还利息 = 剩余本金*月利率
        var monForA = 0; //月还本金=每月还款-月还利息
        var payA = 0; //
        var allPay = 0; //
        var sum = joinAmount;
        for (var j = 1; j <= months; j++) {
            monForRate = Math.floor(sum * i * 100) / 100;
            monForA = monPay - monForRate;
            sum = sum - monForA;
            if (j == months) {
                monForA = joinAmount - payA;
            }
            payA = payA + monForA;
            allPay = allPay + Math.round((monForA + monForRate) * 100) / 100;
        }
        return Math.round((allPay - joinAmount) * 100) / 100;
    },
    //定投宝收益计算公式:输入金额/月份数/利率
    dtbCalc: function(type, joinAmout, term, interestRate) {
        //var sy = joinAmout*interestRate/100/12*term;
        var sy;
        if (type == 1 || type == 2) { //灵活宝&新手标
            sy = (joinAmout / 10000 * term) * (10000 * interestRate / 100 / 360);
        }
        if (type == 3 || type == 4) { //V专享&普通定投宝
            sy = joinAmout * interestRate / 100 / 12 * term;
        }
        sy = String(sy);
        if (/\./.test(sy)) {
            return sy.split('.')[0] + '.' + sy.split('.')[1].substr(0, 2);
        } else {
            return sy + '.00';
        }
    },
    //设置活动入口链接，参数：{a标签id : 活动页面pathname}
    setOutHref: function(obj) {
        for (key in obj) document.getElementById(key).href = location.origin + obj[key];
    },
    
    //数字补位    
    initNum: function(n) {        
        return n > 9 ? n : '0'+n;    
    },

    //从app获取token
    getTokenFromApp : function(fns){
       var ua_ios = window.navigator.userAgent.toLowerCase().match(/RRJC3.0_iOS/i),
           ua_android = window.navigator.userAgent.toLowerCase().match(/RRJC3.0_Android/i); 
       //首先判断是否app中打开h5
        if (ua_ios || ua_android) {
            //如果是ios
            if (ua_ios  == 'rrjc3.0_ios') {
                 // 第一连接时初始化bridage -- IOS
                base.setupWebViewJavascriptBridge(function(bridge) {
                    /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。
                        ObjC端可以在处理完成后，反馈给JS，
                        这样写就是在载入页面完成时就先调用*/
                    bridge.callHandler('getToken', { 'param': '' },
                        function(response) {
                            base.setlocalStorage('_token',response);
                            fns();
                        })
                });
            }//如果是Android
            else if(ua_android == 'rrjc3.0_android'){
                // 第一连接时初始化bridage -- Android
                base.connectWebViewJavascriptBridge(function(bridge) {

                    bridge.init(function(message, responseCallback) {

                    });
                    //call native method js调用Java方法. 重点.
                    window.WebViewJavascriptBridge.callHandler(
                        'getToken' //java的约定的方法名   
                        , { 'param': "111" }, // js传递过来的数据.String类型.可以是json数据.
                        function(response) { //responseData : js调用Java后的返回值. 
                            base.setlocalStorage('_token',response);
                            fns();
                        }
                    );
                });
            }
        }else{
            fns();
        }
    },
    //调用app登陆
    gotoAppLogin : function(fns){
       var ua_ios = window.navigator.userAgent.toLowerCase().match(/RRJC3.0_iOS/i),
           ua_android = window.navigator.userAgent.toLowerCase().match(/RRJC3.0_Android/i); 
       //首先判断是否app中打开h5
        if (ua_ios || ua_android) {
            //如果是ios
            if (ua_ios  == 'rrjc3.0_ios') {
                 // 第一连接时初始化bridage -- IOS
                base.setupWebViewJavascriptBridge(function(bridge) {
                    /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。
                        ObjC端可以在处理完成后，反馈给JS，
                        这样写就是在载入页面完成时就先调用*/
                    bridge.callHandler('needLogin', { 'param': '' },
                        function(response) {
                            
                        })
                });
            }//如果是Android
            else if(ua_android == 'rrjc3.0_android'){
                // 第一连接时初始化bridage -- Android
                base.connectWebViewJavascriptBridge(function(bridge) {
                    bridge.init(function(message, responseCallback) {});
                    //call native method js调用Java方法. 重点.
                    window.WebViewJavascriptBridge.callHandler(
                        'gotoLogin' //java的约定的方法名   
                        , { 'param': "111" }, // js传递过来的数据.String类型.可以是json数据.
                        function(response) {
                            
                        }
                    );
                });
            }
        }else{
            fns();
        }
    }     
};
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
