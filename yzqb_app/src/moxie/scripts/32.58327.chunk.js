webpackJsonp([32,43],{15:function(e,t,n){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){var n={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),l=function(e,t,n){for(var o=!0;o;){var r=e,a=t,s=n;o=!1,null===r&&(r=Function.prototype);var i=Object.getOwnPropertyDescriptor(r,a);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var u=Object.getPrototypeOf(r);if(null===u)return;e=u,t=a,n=s,o=!0,i=u=void 0}},u=n(2),d=o(u),c=n(16),f=n(10),p=(o(f),n(1)),h=function(e){function t(e,n){a(this,t),l(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,n),this.state={}}return s(t,e),i(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.showTips,n=e.showOrHideSpinner,o=e.size,a=e.color,s=e.boxSize,i=(r(e,["showTips","showOrHideSpinner","size","color","boxSize"]),{display:n,width:"100%",maxWidth:p.qsParams.maxWidth?p.qsParams.maxWidth:"800px",height:p.qsParams.height?p.qsParams.height+"px":"100%",position:"fixed",right:0,bottom:0,margin:"0 auto",left:0,top:0,zIndex:996,background:"rgba(0,0,0,.4)"});return d.default.createElement("div",{style:i},d.default.createElement("div",{className:"SpinerBox",style:{overflow:"hidden",background:"rgba(22,22,22,0.8)",position:"absolute",top:"40%",left:"50%",width:""+s,height:""+s,borderRadius:"10px"}},d.default.createElement("div",{className:"newSpiner",style:{top:t?s/6+"px":(s-o)/2+"px"}},d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32",width:o,height:o,fill:a},d.default.createElement("path",{opacity:".25",d:"M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}),d.default.createElement("path",{d:"M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"}))),d.default.createElement("div",{style:{color:"#fff",textAlign:"center",width:"100%",fontSize:"13px",position:"absolute",top:""+2*s/3}},t)))}}]),t}(d.default.Component);t.default=h,h.contextTypes={history:function(){return c.PropTypes.history}},h.defaultProps={boxSize:120,size:48,showTips:"正在加载",color:"#fff"},e.exports=t.default}).call(this)}finally{}},50:function(e,t,n){try{(function(){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e){var t="";return"login"==e.tasktype?t=l.default.zhengxinNewLogin:"creatLoginTask"==e.tasktype?t=l.default.zhengXinNewLoginTask:"loginImgcode"==e.tasktype?t=l.default.zhengxinNewLogImgCode:"creatRegistTask"==e.tasktype?t=l.default.zhengXinNewRegistTask:"registImgcode"==e.tasktype?t=l.default.zhengxinNewRegImgCode:"registStep1"==e.tasktype?t=l.default.zhengxinNewRegStep1:"registStep2"==e.tasktype?t=l.default.zhengxinNewRegStep2:"registStep2ActCode"==e.tasktype?t=l.default.zhengxinNewRegActCode:"zhengxinReportApply"==e.tasktype?t=l.default.zhengxinReportApply:"submitAnswerResult"==e.tasktype?t=l.default.zhengxinReportAnswer:"zhengxinReportSms"==e.tasktype?t=l.default.zhengxinReportSms:"zhengxinfindLoginName"==e.tasktype?t=l.default.zhengxinfindLoginName:"zhengXinfindLogNameTask"==e.tasktype?t=l.default.zhengXinfindLogNameTask:"zhengxinFindLogNameImgCode"==e.tasktype?t=l.default.zhengxinFindLogNameImgCode:"zhengxinResetPwdTask"==e.tasktype?t=l.default.zhengxinResetPwdTask:"zhengxinresetPwdImgCode"==e.tasktype?t=l.default.zhengxinresetPwdImgCode:"zhengxinresetPwdidentyVerify"==e.tasktype?t=l.default.zhengxinresetPwdidentyVerify:"zhengxinresetPwdactCode"==e.tasktype?t=l.default.zhengxinresetPwdactCode:"zhengxinresetPwdupdatepwd"==e.tasktype?t=l.default.zhengxinresetPwdupdatepwd:"zhengxinresetPwdanswerquestion"==e.tasktype&&(t=l.default.zhengxinresetPwdanswerquestion),s.request.post(t).set(a({},d.default.addDefaultHeaders())).set("Content-Type","application/json").set("Accept","application/json").set("Cache-Control","no-store").send(e.requestParams)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e};t.default=r;var s=n(1),i=n(25),l=o(i),u=n(12),d=o(u);e.exports=t.default}).call(this)}finally{}},831:function(e,t,n){try{(function(){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),s=function(e,t,n){for(var o=!0;o;){var r=e,a=t,s=n;o=!1,null===r&&(r=Function.prototype);var i=Object.getOwnPropertyDescriptor(r,a);if(void 0!==i){if("value"in i)return i.value;var l=i.get;if(void 0===l)return;return l.call(s)}var u=Object.getPrototypeOf(r);if(null===u)return;e=u,t=a,n=s,o=!0,i=u=void 0}},i=n(2),l=t(i),u=n(16),d=n(10),c=t(d),f=n(1),p=n(15),h=t(p),m=n(12),y=t(m),g=n(50),b=t(g),v=n(9),w=t(v),x=n(6),k=t(x),P=n(29),z=t(P),S=n(7),E=t(S),T=function(e){function t(e,n){o(this,t),s(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,n),this.renderReportSms=this.renderReportSms.bind(this),this.state={questionList:null,time:"",mobile:"",reportMethod:"none",showTip:"none",tip:"",showspinner:"none",themeColor:f.qsParams.themeColor?"#"+f.qsParams.themeColor:"#c11000"}}return r(t,e),a(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"componentDidMount",value:function(){var e=this;PG.refreshTitle("申请报告"),this.setState({showspinner:"block"});var t={tasktype:"zhengxinReportApply",requestParams:{taskId:storage.getItem("zhengxinTaskid"),userId:y.default.userId}};(0,b.default)(t).then(function(t){e.setState({showspinner:"none"}),6==t.body.code?!function(){var n=600,o=void 0,r=void 0;e.setState({reportMethod:"question",questionList:t.body.questions,time:"10:00"}),e.refs.timeBox?e.refs.timeBox.innerHTML="距离身份验证结束时间：10:00":null,e.timer=setInterval(function(){return 0==o&&0==r?(clearInterval(e.timer),e.timer=null,alert("身份验证时间已过，请重新登录！"),e.context.history.go(),!1):(n--,o=Math.floor(n/60),r=n-60*Math.floor(n/60),r<10&&(r="0"+r),void(e.refs.timeBox?e.refs.timeBox.innerHTML="距离身份验证结束时间：0"+o+":"+r:null))},1e3)}():16==t.body.code||1==t.body.code?(clearInterval(e.timer),alert(t.body.message),e.context.history.go(-2)):3==t.body.code?(clearInterval(e.timer),alert(t.body.message),e.context.history.go(-1)):5==t.body.code&&e.setState({reportMethod:"sms",mobile:t.body.mobile,showTip:"block",tip:t.body.message})}).catch(function(t){clearInterval(e.timer),e.setState({showspinner:"none"});var n=t.body?t.body.detail:"网络异常，请稍后再试"+t;PG.alert(n)})}},{key:"render",value:function(){var e=this,t=this.state.questionList;return t||"none"!=this.state.reportMethod?l.default.createElement("div",{className:"zx-reportQuestion zx-new mx-view"},"NO"==f.qsParams.showTitleBar||0==f.qsParams.showTitleBar||PG.Device.SDK?null:l.default.createElement("div",{style:{height:"NO"==f.qsParams.showTitleBar||PG.Device.SDK?0:44}},l.default.createElement(k.default,{title:"征信报告查询",left:l.default.createElement(E.default,{onTap:function(){w.default.call(e)}},l.default.createElement("i",{className:"ion-chevron-left"}))})),l.default.createElement(h.default,{color:"#fff",showOrHideSpinner:this.state.showspinner}),l.default.createElement("div",{className:"zx-reportQuesTitle"},"个人信用信息服务平台"),l.default.createElement("div",{className:"zx-reportQues-content"},l.default.createElement("div",{style:{borderColor:this.state.themeColor},className:"zx-reportQues-content-title"},"申请用户信息"),"question"==this.state.reportMethod?this.renderQuesList(t):this.renderReportSms())):l.default.createElement(h.default,{color:"#fff",showOrHideSpinner:this.state.showspinner})}},{key:"renderQuesList",value:function(e){var t=this;return l.default.createElement("div",{ref:"questionList",className:"reportQues-list"},l.default.createElement("div",{ref:"timeBox",className:"timeBox"},"距离身份验证结束时间："),e.map(function(e,t){var n=[];for(var o in e.options)n.push(e.options[o]);return l.default.createElement("div",{className:"list-in",key:t},l.default.createElement("p",null,"问题"+(t+1)+"："+e.question),l.default.createElement("ul",null,n.map(function(e,n){return l.default.createElement("li",{key:n},l.default.createElement("input",{id:"q"+t+"a"+n,ref:"checkBox",name:"ques"+t,type:"radio"}),l.default.createElement("label",{htmlFor:"q"+t+"a"+n},e))})))}),l.default.createElement("div",{className:"reportBtn"},l.default.createElement(c.default,{onTap:function(){w.default.call(t)}},l.default.createElement("button",{style:{background:this.state.themeColor}},"上一步")),l.default.createElement(c.default,{onTap:this.submitAnswerResult.bind(this)},l.default.createElement("button",{style:{background:this.state.themeColor}},"提交"))))}},{key:"renderReportSms",value:function(){return l.default.createElement("div",{className:"reportSms"},l.default.createElement("div",{className:"report-mobile"},l.default.createElement("span",null,"您的手机号"),l.default.createElement("span",null,this.state.mobile)),l.default.createElement("div",{className:"report-actCode"},l.default.createElement("span",null,"手机动态码"),l.default.createElement("input",{ref:"smsCode",type:"text"})),l.default.createElement("div",{style:{display:this.state.showTip,color:"red",textAlign:"center",fontSize:"14px"}},this.state.tip),l.default.createElement(c.default,{onTap:this.submitReportSms.bind(this)},l.default.createElement("button",{style:{background:this.state.themeColor},className:"sendApplySms"},"提交")))}},{key:"submitAnswerResult",value:function(){for(var e=this,t=this.refs.questionList,n=t.querySelectorAll(".list-in"),o=this.state.questionList,r=[],a=0;a<n.length;a++)for(var s=n[a].querySelectorAll("input"),i=0;i<s.length;i++)s[i].checked&&(o[a].answerresult=i+1,r.push(i));if(r.length<5)return void alert("请完成您的问题！");this.setState({showspinner:"block"});var l={tasktype:"submitAnswerResult",requestParams:{taskId:storage.getItem("zhengxinTaskid"),userId:y.default.userId,answerList:o}};(0,b.default)(l).then(function(t){e.setState({showspinner:"none"}),f.qsParams.extraUrl?(0==t.body.code?PG.applyStatus=1:PG.applyStatus=0,PG.message=t.body.message,(0,z.default)({taskType:"zhengxin",backType:"applyReport"})):0!=t.body.code&&1!=t.body.code&&15!=t.body.code&&16!=t.body.code||(alert(t.body.message),e.context.history.go(-2))}).catch(function(t){e.setState({showspinner:"none"}),console.log(t);var n=t.body?t.body.detail:"网络异常，请稍后再试"+t;PG.alert(n)})}},{key:"submitReportSms",value:function(){var e=this;if(""==this.refs.smsCode.value.Trim())return!1;var t={tasktype:"zhengxinReportSms",requestParams:{taskId:storage.getItem("zhengxinTaskid"),userId:y.default.userId,verifyCode:this.refs.smsCode.value.Trim()}};this.setState({showspinner:"block"}),(0,b.default)(t).then(function(t){e.setState({showspinner:"none"}),5==t.body.code?e.setState({showTip:"block",tip:t.body.message}):3==t.body.code?(alert(t.body.message),e.context.history.go(-1)):0!=t.body.code&&1!=t.body.code&&16!=t.body.code||(f.qsParams.extraUrl?(0==t.body.code?PG.applyStatus=1:PG.applyStatus=0,PG.message=t.body.message,(0,z.default)({taskType:"zhengxin",backType:"applyReport"})):(alert(t.body.message),e.context.history.go(-2)))}).catch(function(t){e.setState({showspinner:"none"}),console.log(t);var n=t.body?t.body.detail:"网络异常，请稍后再试"+t;PG.alert(n)})}}]),t}(l.default.Component);T.contextTypes={history:u.PropTypes.history},e.exports=T}).call(this)}finally{}}});