webpackJsonp([39],{226:function(e,t,a){try{(function(){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(2),s=l(n),r=(a(1),a(8)),u=a(9),i=(l(u),a(4)),o=l(i),m=a(14),d=l(m),c=a(40),f=a(13),p=l(f),h=a(5),E=l(h),g=a(11),y=(l(g),a(18)),v=l(y),N=a(6),T=(l(N),a(7)),S=(l(T),a(268)),w=l(S),b=a(41),k=l(b),B=(a(166),/^[0-9a-z][_.0-9a-z-]{0,31}@([0-9a-z][0-9a-z-]{0,30}[0-9a-z]\.){1,4}[a-z]{2,4}$/i),C=s.default.createClass({displayName:"ImportForm",getInitialState:function(){return{phoneInfo:null,unsupport:!1,showUnsupport:!1,isStart:!1,defaultPhone:"",Type:"password",frontConf:this.props.frontConf}},componentDidMount:function(){var e=this,t=[];document.getElementsByClassName("emailSelect")[0]&&(t=document.getElementsByClassName("emailSelect")[0].getElementsByTagName("li"));for(var a=0;a<t.length;a++)t[a].onclick=function(){var e=this.getElementsByTagName("span")[0].innerHTML,t=this.getElementsByTagName("a")[0].innerHTML;document.getElementById("emailMobile").getElementsByTagName("input")[0].value=e+t,document.getElementsByClassName("emailSelect")[0]&&(document.getElementsByClassName("emailSelect")[0].style.display="none")};document.onclick=function(){document.getElementsByClassName("emailSelect")[0]&&(document.getElementsByClassName("emailSelect")[0].style.display="none")},document.getElementsByClassName("mx-view")[0].onclick=function(){document.getElementsByClassName("emailSelect")[0]&&(document.getElementsByClassName("emailSelect")[0].style.display="none")};var l=(0,c.getParams)("loginParams");l&&"undefined"!=l&&l.username&&l.password&&(this.timer=setInterval(function(){""!=e.refs.phone.getValue()&&""!=e.refs.password.getValue()&&(clearInterval(e.timer),e.handleImport())},100))},componentWillUnmount:function(){this.unmount=!0,clearInterval(this.timer)},render:function(){var e=this,t=(this.handleImport,this.state),a=t.unsupport,l=t.showUnsupport,n=t.isStart,r=(t.defaultPhone,(0,c.getParams)("loginParams")),u=r?r.password:null,i=d.default.get("email",0,0,0),o="";i&&i.loginParam&&(o=i.loginParam.phone);var m=l?s.default.createElement("div",{className:"carrier-unsupport"},s.default.createElement("i",null),s.default.createElement("p",null,a)):s.default.createElement("div",null,s.default.createElement("div",{className:"form common-form"},s.default.createElement("div",{className:"centerImgDiv-email"},s.default.createElement("img",{className:"centerImg-type3",src:w.default})),s.default.createElement("div",{style:{position:"relative"},className:"input-item"},s.default.createElement(p.default,{type:"text",ref:"phone",id:"emailMobile",placeholder:"请输入邮箱账号",onKeyUp:this.emailKeyUp,defaultValue:r?r.username:o}),s.default.createElement("div",{className:"emailSelect"},s.default.createElement("ul",null,s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@qq.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@163.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@126.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@139.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@189.cn")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@sina.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@sohu.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@hotmail.com")),s.default.createElement("li",null,s.default.createElement("span",null),s.default.createElement("a",null,"@21cn.com")))),s.default.createElement("div",{onClick:this.clearValue,className:"tex_box"},s.default.createElement("span",{className:"textt"}))),s.default.createElement("div",{className:"input-item"},s.default.createElement(p.default,{type:this.state.Type,ref:"password",id:"emailPassword",defaultValue:u,placeholder:"请输入密码"}),s.default.createElement("div",{onClick:this.showPwd,className:"tex_box"},s.default.createElement("span",{className:"password password_show"})))),s.default.createElement(k.default,{ref:"agreementField",uid:"0",frontConf:this.state.frontConf}),s.default.createElement("div",{className:"page-wrapper email_spinner"},s.default.createElement(E.default,{types:"full",onTap:function(){e.handleImport()},disable:n,state:n,getState:function(e){switch(e){case!1:return"提交";case!0:return"登录中...";default:return"提交"}}}),s.default.createElement("div",{className:"tip"},s.default.createElement("div",null,"温馨提示:"),"*请授权有信用卡账单的邮箱")));return s.default.createElement("div",null,s.default.createElement(v.default,null,m))},handleImport:function(){var e=this;if(!this.refs.agreementField.isChecked(b.AGREEMENT_TYPE.MOXIE))return void setTimeout(function(){return o.default.alert("请勾选同意《用户使用协议》","")});if(!this.refs.agreementField.isChecked(b.AGREEMENT_TYPE.TENANT))return void setTimeout(function(){return o.default.alert("请勾选同意《用户使用协议》","")});var t=this.submitTask;if(!this.refs.phone.getValue()||!B.test(this.refs.phone.getValue()))return void setTimeout(function(){return o.default.alert("请输入正确的邮箱账号","")});if(!this.refs.password.getValue())return void setTimeout(function(){return o.default.alert("请输入密码","")});this.setState({isStart:!0});var a=this.refs.phone.getValue(),l=this.refs.password.getValue(),n=!1;try{"function"==typeof window.mxRelogin&&(n=!0)}catch(e){}try{"function"==typeof android.mxRelogin&&(n=!0)}catch(e){}o.default.Device.SDK&&n?!function(){var n=a.split("@"),s=n[0],u=n[1];(0,r.fetchList)({taskType:"email"}).then(function(e){for(var n in e)if(u==e[n].host&&"1"==e[n].items.isCanUseWebLogin)return void o.default.mxRelogin({taskType:"email",userAgent:e[n].items.userAgent,loginUrl:e[n].items.loginUrl,jsUrl:e[n].items.jsurl,host:e[n].host,replace:!0,account:s,password:l});t(a,l)}).catch(function(t){return e.setState({fail:!0})})}():t(a,l)},submitTask:function(e,t){var a=this,l=(this.state.phoneInfo,this.onSubmitTaskDone);(0,r.submitTaskHelper)({taskType:"email",username:e,password:t}).then(function(t){if(t.body.task_id){a.setState({isStart:!1}),o.default.refreshStatus("2","创建任务成功"),o.default.mxSaveTaskId(t.body.task_id);var n={taskId:t.body.task_id,email_id:t.body.email_id,username:e,taskType:"email",loginParam:{phone:e}};l(n),d.default.set("email",0,0,0,{loginParam:{phone:e}})}}).catch(function(e){a.setState({isStart:!1});var t=e&&e.response&&e.response.body||{};t.errors&&t.errors[0]&&(10220011===t.errors[0].code||10220012===t.errors[0].code)?(o.default.refreshStatus("-2",t.errors[0].message),a.showUnsupport(t.errors[0].message)):(o.default.refreshStatus("-3","服务异常，创建任务失败"),a.handleError(e,t.detail))})},handleError:function(e){var t=arguments.length<=1||void 0===arguments[1]?"任务提交失败":arguments[1];try{t=e&&e.body&&e.body.detail||t}catch(e){console.log(e)}if("任务提交失败"==t){if(e&&e.message&&e.message.indexOf("the network is offline")!=-1)return void o.default.alert("网络开小差啦，请稍后再试");o.default.alert(t+"\n"+e)}else o.default.alert(t);this.setState({isStart:!1})},showPwd:function(){"text"==this.state.Type?(this.setState({Type:"password"}),document.getElementsByClassName("password_show")[0].style.backgroundImage="url("+a(20)+")"):(this.setState({Type:"text"}),document.getElementsByClassName("password_show")[0].style.backgroundImage="url("+a(36)+")")},clearValue:function(){document.getElementById("emailMobile").getElementsByTagName("input")[0].value=""},showUnsupport:function(e){this.setState({unsupport:e||this.state.unsupport,showUnsupport:!0})},onSubmitTaskDone:function(e){return e.importResult={},this.props.onSubmitTaskDone(e),!0},emailKeyUp:function(){if(this.refs.phone.getValue().indexOf("@")!=-1){document.getElementsByClassName("emailSelect")[0].style.display="block";for(var e=this.refs.phone.getValue().indexOf("@"),t=this.refs.phone.getValue().substring(e),a=document.getElementsByClassName("emailSelect")[0].getElementsByTagName("li"),l=0;l<a.length;l++)a[l].style.display="none",a[l].getElementsByTagName("a")[0].innerHTML.indexOf(t)!=-1&&(a[l].style.display="block",a[l].getElementsByTagName("span")[0].innerHTML=this.refs.phone.getValue().substring(0,e),a[l].getElementsByTagName("a")[0].innerHTML==t&&(document.getElementsByClassName("emailSelect")[0].style.display="none"))}else document.getElementsByClassName("emailSelect")[0].style.display="none"}});t.default=C,e.exports=t.default}).call(this)}finally{}},268:function(e,t,a){e.exports=a.p+"assets/81f0cdd1.email_logo_icn_yx@3x.png"}});