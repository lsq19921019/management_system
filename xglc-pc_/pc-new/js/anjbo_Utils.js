/**

*作者：WYC

*时间：2017-8-1

*描述：工具包

**/

//工具
var Utils = {
	//校验手机号
	checkPhone: function(number) {
		if(!(/^1[3456789]\d{9}$/.test(number))) {
			return false;
		} else {
			return true;
		}
	},
	//检验6-20位字母与数字的组合密码
	checkPassword: function(number) {
//		var regExp = /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}/;
        var regExp = /[\d\w]{6,20}/;
		if(regExp.test(number)) {
			return true;
		} else {
			return false;
		}
	},

	//input 限制长度
	inputLimitlengthFunc: function(obj, length) {
		if(typeof obj !== 'object' || obj == '') throw new Error('object is nessary -- by WYC');
		if(typeof length !== 'number' || length == '') throw new Error('please input length  --by WYC');
		if(obj.val().length > length) {
			obj.val(obj.val().substr(0, length));
		}
	},

	//检查用户是否登录
	checkLogin: function() {
		if(localStorage.getItem('token') && localStorage.getItem('IMEI') && sessionStorage.getItem('userInfo')) {
			var userInfo = '';
			var info;
			userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
			info = "用户 " + userInfo.nickName;
			$('li#loginInfo').html(info + '<font id="signOut"> 退出<font>');
			$('li#loginInfo').attr('data-href', '');
			$('font#signOut').on('click', function() {
				if(window.confirm('是否退出登录？')) {
					$('li#loginInfo').html("大额充值");
					Utils.signOut();
					Web.go('index.html');
				}
			});
			return true;
		} else {
			return false;
		}
	},

	//退出登录
	signOut: function(callBack) {
		localStorage.clear();
		sessionStorage.clear();
		if(callBack && typeof callBack == "function") {
			callBack();
		}
	},

	//生成imei 号码
	creatImeiNumber: function() {
		var time = new Date();
		var imeiNumber = time.getTime() + time.getTime().toString().substr(4, 11);
		return imeiNumber;
	},

	//键盘事件  例：Utils.keyboardDownFunc($('div') , 13 , 'click');
	keyboardDownFunc: function(obj, keyNumber,event) {
		if(typeof obj != 'object') throw new Error('first argument is onject --by wyc');
		document.onkeydown = function(e) {
			var ev = document.all ? window.event : e;
			if(ev.keyCode == keyNumber) {
				obj.trigger(event);
			}
		}
	},
	
	
		// 从url解析请求参数
	getQueryParameter: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	}
}

// 网络
var Web = {
	// 跳转 Web.go(url)
	go: function go(url, callBack) {
		window.location.href = url;
	},
	// 回退到前一个页面
	back: function() {
		window.history.back();
	},
	backRefresh: function() {
		window.location.href = document.referrer;
	}
};