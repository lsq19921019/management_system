webpackJsonp([48],{240:function(e,t,a){try{(function(){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){var a=[],r=!0,n=!1,o=void 0;try{for(var s,l=e[Symbol.iterator]();!(r=(s=l.next()).done)&&(a.push(s.value),!t||a.length!==t);r=!0);}catch(e){n=!0,o=e}finally{try{!r&&l.return&&l.return()}finally{if(n)throw o}}return a}return function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),o=a(2),s=r(o),l=a(1),i=a(8),u=a(9),d=r(u),f=a(4),p=r(f),m=a(14),c=r(m),h=a(13),g=r(h),y=a(5),v=r(y),E=a(11),T=(r(E),a(18)),w=r(T),b=a(6),S=r(b),P=a(7),U=r(P),k=a(41),I=r(k),N=s.default.createClass({displayName:"ImportForm",getInitialState:function(){return{phoneInfo:null,unsupport:!1,showUnsupport:!1,isStart:!1,defaultUsername:"",frontConf:this.props.frontConf}},componentDidMount:function(){},componentWillUnmount:function(){this.unmount=!0},render:function(){var e=this.handleImport,t=(this.handleProtocol,this.state),a=t.unsupport,r=t.showUnsupport,n=t.isStart,o=(t.defaultUsername,c.default.get("taobaoshop",0,0,0)),l="";o&&o.loginParam&&(l=o.loginParam.phone);var i=s.default.createElement(U.default,{onTap:d.default.bind(this,null)},s.default.createElement("i",{className:"ion-chevron-left"})),u=("YES"==this.props.isWeb?s.default.createElement(S.default,{title:"京东",left:i}):null,r?s.default.createElement("div",{className:"carrier-unsupport"},s.default.createElement("i",null),s.default.createElement("p",null,a)):s.default.createElement("div",{className:"config-import-page"},s.default.createElement("div",{className:"form common-form"},s.default.createElement("div",{className:"input-item"},s.default.createElement(g.default,{type:"text",ref:"username",id:"zxUsername",placeholder:this.props.loginType?"请输入淘宝账号":"请输入淘宝会员名/邮箱/已验证手机号",label:"sms"==this.props.loginType?"手机号":"账户名",defaultValue:l})),"pwd"==this.props.loginType?s.default.createElement("div",{className:"input-item"},s.default.createElement(g.default,{type:"password",ref:"password",id:"zxPassword",placeholder:"请输入登录密码",label:"密码"})):null),s.default.createElement(I.default,{ref:"agreementField",uid:this.props.loginType,frontConf:this.state.frontConf}),s.default.createElement("div",{className:"page-wrapper"},s.default.createElement(v.default,{types:"full",onTap:e,disable:n,state:n,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}}))));return s.default.createElement("div",null,s.default.createElement(w.default,null,u))},handleImport:function(){var e=this;if(!this.refs.agreementField.isChecked(k.AGREEMENT_TYPE.MOXIE))return void setTimeout(function(){return p.default.alert("请勾选同意《用户使用协议》","")});if(!this.refs.agreementField.isChecked(k.AGREEMENT_TYPE.TENANT))return void setTimeout(function(){return p.default.alert("请勾选同意《用户使用协议》","")});var t=this.props.onSubmitTaskDone,a=(this.state.phoneInfo,this.refs.username.getValue()),r=void 0;if("pwd"==this.props.loginType&&(r=this.refs.password.getValue()),!a)return void setTimeout(function(){return p.default.alert("请输入正确的登录名","")});if("pwd"==this.props.loginType&&!r)return void setTimeout(function(){return p.default.alert("请输入正确的登录密码","")});this.setState({isStart:!0});var n=void 0;(0,i.submitTaskHelper)({taskType:"taobaoshop",loginType:this.props.loginType,username:a,password:r}).then(function(r){if(n=r,r.body.task_id){e.setState({isStart:!1}),p.default.refreshStatus("2","创建任务成功"),p.default.mxSaveTaskId(r.body.task_id);var o={taskId:r.body.task_id,username:a,mappingId:r.body.mapping_id,taskType:"taobaoshop",loginType:e.props.loginType,loginParam:{phone:a}};t(o)}}).catch(function(t){e.setState({isStart:!1}),console.log(t);var a=t&&t.response&&t.response.body||{};a.errors&&a.errors[0]&&(10220011===a.errors[0].code||10220012===a.errors[0].code)?(p.default.refreshStatus("-2",a.errors[0].message),e.showUnsupport(a.errors[0].message)):(p.default.refreshStatus("-3","服务异常，创建任务失败"),e.handleError(t,a.detail))})},handleError:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];try{t=e&&e.body&&e.body.detail||t}catch(e){}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void p.default.alert("网络开小差啦，请稍后再试");p.default.alert(t+"\n"+e)}else p.default.alert(t);this.setState({isStart:!1})},handleTanentProtocol:function(){var e=l.qsParams.tenantAgreementUrl&&"undefined"!=l.qsParams.tenantAgreementUrl?l.qsParams.tenantAgreementUrl:"";p.default.openWebView("用户使用协议",e,"","agreement")},handleProtocol:function(){var e=p.default.Device.SDK?0:l.qsParams.showTitleBar,t=l.qsParams.themeColor,a=l.qsParams.agreementUrl&&"undefined"!=l.qsParams.agreementUrl?l.qsParams.agreementUrl:"https://api.51datakey.com/h5/agreement.html?showTitleBar="+e+"&themeColor="+t;p.default.openWebView("用户使用协议",a,"","agreement")},handleForgetSMS:function(e){var t=n(e,3),a=t[0],r=t[1],o=t[2];p.default.confirm(r,"","取消,发送",function(e){2==e&&((0,l.isIOS)()?window.location.href="sms:"+o+"&body="+a:window.location.href="sms:"+o+"?body="+a)})},showUnsupport:function(e){this.setState({unsupport:e||this.state.unsupport,showUnsupport:!0})}});t.default=N,e.exports=t.default}).call(this)}finally{}}});