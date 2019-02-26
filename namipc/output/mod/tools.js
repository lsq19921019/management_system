define("mod/tools",function(r,e,t){var i={loginCheck:function(){var r=Cookies.get("token")||"";$("header .none-li").hide(),r?($("header .login-wrap").hide(),$("header .logout-li").show(),$("header .account-wrap").show()):($("header .account-wrap").hide(),$("header .logout-li").hide(),$("header .login-wrap").show())},getName:function(r){return $(r).attr("class").match(/(form-)\w*/)[0].replace("form-","")},formVerification:function(r){var e=!1,t={phone:{reg:/^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|19[0-9]{1}[0-9]{8}$|16[0-9]{1}[0-9]{8}$/,error:"手机号格式错误",error_empty:"手机号不能为空",error_2:"手机号为11位，请重新输入",validate:function(r){if(r=String(r),""==r)return this.error_empty;if(r.length<11)return this.error_2;var e=this.reg.test(r);return e?!0:this.error}},imgCode:{reg:/^([0-9]){4}$/,error:"图形验证码错误",validate:function(r){var e=this.reg.test($.trim(r));return e?!0:this.error}},PhoneCode:{reg:/^\d+$/,error:"验证码错误",error_empty:"验证码不能为空",validate:function(r){if(""==r)return this.error_empty;var e=this.reg.test($.trim(r));return e?!0:this.error}},password:{min:6,max:20,storage:null,reg:/^([a-zA-Z0-9]){6,20}$/,error:"密码长度为6-20个字符[区分大小写，支持英文数字]",error_empty:"密码不能为空",error_min:function(){return"密码最少"+this.min+"个字符"},error_max:function(){return"密码最多"+this.max+"个字符"},validate:function(r,e){r=r.toString();var t=this.error;if(e&&e.error&&(t=e.error),""==r)return this.error_empty;if(r.length<this.min)return this.error_min();if(r.length>this.max)return this.error_max();var i=this.reg.test($.trim(r));return i?!0:t}},password2:{error:"两次密码不一致",validate:function(r){return""==r?t.password.error_empty:r!=$(".form-password").val()?t.password2.error:!0}}},n=$(r),a=(n.find(".form-phone"),n.find(".form-PhoneCode"),n.find(".form-imgCode"),n.find(".form-password"),$("input[class*=form-]",n));return a.each(function(){var r=$(this),a=i.getName(r);return 1!=t[a].validate(r.val())?(n.find(r).addClass("input-tips"),n.find(r).focus(),n.find(".tips-register").text(t[a].validate(r.val())).fadeIn(),e=!1,!1):(n.find(r).removeClass("input-tips"),n.find(".tips-register").text("").hide(),e=!0,void 0)}),e},apiUrl:function(){var r="https:"===location.protocol?"https://":"http://",e={data:r+"pcapi.namilicai.com/mobile"};return 7890==location.port||"7890"==location.port?e={data:r+"test.namilicai.com/mobile"}:location.hostname.indexOf("test")>=0&&(e={data:r+"test.namilicai.com/mobile"}),e},getUrlParam:function(r){var e=new RegExp("(\\?|#|&)"+r+"=([^&#]*)(&|#|$)"),t=location.href.match(e);return t?t[2]:""},fetchAjax:function(r,e,t,i){var n={clientType:"3",token:Cookies.get("token")||"",timestamp:Date.now(),clientVersion:"1.0.0"};return $.ajaxSetup({success:function(r){(-3==r.status||"-3"==r.status)&&(Cookies.remove("token"),window.location.href="/login.html")}}),$.ajax({url:r,type:t||"post",headers:$.extend(n,i),beforeSend:function(r){r.withCredentials=!0},data:e})},renderTpl:function(r,e,t){if("undefined"==typeof Handlebars)return!1;Handlebars.registerHelper("isActive",function(r){return 0==r?"first active":""}),Handlebars.registerHelper("isHave",function(r){return 1==r?"有":2==r?"无":r}),Handlebars.registerHelper("isDay",function(r){return 0==r?"天":2==r?"月":""}),Handlebars.registerHelper("isTop3",function(r){return 1==r?'<div class="img img-1"></div>':2==r?'<div class="img img-2"></div>':3==r?'<div class="img img-3"></div>':r}),Handlebars.registerHelper("isStatus",function(r){return"审核通过"==r?"<a class='btn'>查看</a>":"已提交"==r?'<a class="btn">查看</a>':"审核失败"==r?'<a class="reject">删除</a>':"<a class='btn'>查看</a>"}),Handlebars.registerHelper("isSty",function(r){return"审核通过"==r?"green-c":"审核失败"==r?"red-c":""}),Handlebars.registerHelper("isNub",function(r){return"2"==r?"red-c":"1"==r?"green-c":""}),Handlebars.registerHelper("dsh",function(r){return"0.00"==r?"正在审核":r}),Handlebars.registerHelper("parInt",function(r){return parseInt(r)});var i=e.html(),n=Handlebars.compile(i),a=n(t);r.html(a)},tipsAlert:function(r,e){var t,e=e||2e3,i=$("#tips-box");return clearTimeout(t),i.find(".text").html(r),i.fadeIn(),t=setTimeout(function(){i.fadeOut()},e),!1},pageClick:function(r,e){r.on("click","a",function(){var t=1,i=1*r.find(".cur-page").text().split("/")[0],n=$(this).attr("data-page");"first"===n?t=1:"prev"===n?t=i-1>0?i-1:1:"next"===n?t=i+1:"end"===n&&(t=r.attr("data-totalPage")),e(1*t)})}};t.exports=i});