webpackJsonp([37,51],{237:function(t,e,a){try{(function(){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),r=function(t,e,a){for(var i=!0;i;){var n=t,s=e,r=a;i=!1,null===n&&(n=Function.prototype);var l=Object.getOwnPropertyDescriptor(n,s);if(void 0!==l){if("value"in l)return l.value;var c=l.get;if(void 0===c)return;return c.call(r)}var o=Object.getPrototypeOf(n);if(null===o)return;t=o,e=s,a=r,i=!0,l=o=void 0}},l=a(2),c=e(l),o=a(16),u=a(6),d=e(u),f=a(7),y=e(f),m=a(18),h=e(m),p=a(11),v=e(p),_=a(1),b=a(9),E=e(b),g=a(113),k=a(10),N=e(k),w=a(8),P=function(t){function e(t,a){i(this,e),r(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t,a),this.renderFunds=this.renderFunds.bind(this),this.handleNext=this.handleNext.bind(this),this.handleChange=this.handleChange.bind(this),this.clearIptval=this.clearIptval.bind(this),this.state={securityList:[],name:"",fail:!1,current_city:"",show_item:"block",current_code:"",noval:"none",hotCity:"",city_status:"",city:"",flag:!1,display_all:!this.props.params||!this.props.params.province},this.data=[],this.val=""}return n(e,t),s(e,[{key:"componentDidMount",value:function(){var t=this;PG.refreshTitle("选择社保城市"),this.getCurrentCity(),(0,w.fetchList)({taskType:"security",options:{type:"city",province:this.props.params&&this.props.params.province||""}}).then(function(e){t.setState({securityList:e}),t.data=e}).catch(function(e){return t.setState({fail:!0})})}},{key:"getCurrentCity",value:function(){var t=this,e=document.querySelector("#securityPosition");e&&document.body.removeChild(e),this.setState({current_city:"正在获取中..."}),window.locate=function(e){var a=e&&e.content&&e.content.address_detail.city||null,i=void 0;return a?(a=a.replace("市",""),i="北京"==a||"天津"==a||"上海"==a||"重庆"==a?a:e&&e.content&&e.content.address_detail.province&&e.content.address_detail.province.replace("省","")||null,void(0,w.fetchList)({taskType:"security",options:{type:"city",province:i}}).then(function(e){var i=!1;e.map(function(e){a==e.city_name&&(i=!0,t.setState({current_code:e.area_code,city_status:e.status}),t.setState({current_city:1!=e.status?a:a+"(正在维护中)"}))}),i||t.setState({city_status:1,current_city:a+"(暂不支持)"})}).catch(function(t){console.log(t)})):void t.setState({current_city:"无法获取您的定位"})};var a=document.createElement("script");a.src="https://api.map.baidu.com/location/ip?ak=uZMTxGSHnl4j6Bi1DtY2e4XtBzrSbXyz&callback=locate",a.id="securityPosition",document.getElementsByTagName("body")[0].appendChild(a)}},{key:"render",value:function(){var t=this,e=this.renderFunds,a=e();return this.state.fail&&(a=c.default.createElement("div",{className:"centered"},"网络异常,请稍后再试")),c.default.createElement("div",{className:"mx-view bank-list-page"},"NO"==_.qsParams.showTitleBar||0==_.qsParams.showTitleBar||PG.Device.SDK?null:c.default.createElement("div",{ref:"titleBar",style:{height:"NO"==_.qsParams.showTitleBar||PG.Device.SDK?0:44}},c.default.createElement(d.default,{title:"选择社保城市",left:c.default.createElement(y.default,{onTap:function(){E.default.call(t)}},c.default.createElement("i",{className:"ion-chevron-left"}))})),c.default.createElement(h.default,null,a))}},{key:"handleChange",value:function(t){for(var e=this.refs.city_val.value,a=[],i=0;i<this.data.length;i++)e!=this.data[i].city_name&&(0,g.pinyin)(this.data[i].city_name)!=e.toLowerCase().trim()||a.push(this.data[i]);for(var i=0;i<this.data.length;i++)if(this.data[i].city_name.indexOf(e)!=-1||(0,g.pinyin)(this.data[i].city_name).indexOf(e.toLowerCase().trim())!=-1){for(var n=!1,s=0;s<a.length;s++)a[s]==this.data[i]&&(n=!0);n||a.push(this.data[i])}0==a.length&&this.setState({flag:!0}),this.setState({securityList:a}),8!=t.keyCode&&this.setState({show_item:"none",noval:"block"}),""==e.trim()&&this.setState({securityList:this.data,show_item:"block",noval:"none"})}},{key:"sort_list",value:function(t,e){return(0,g.makePy)(t.city_name)[0]>(0,g.makePy)(e.city_name)[0]?1:-1}},{key:"renderFunds",value:function(){var t=this,e=this.state,a=e.securityList,i=e.flag,n=this.sort_list;if(0===a.length&&!i)return c.default.createElement("div",{className:"centered"},c.default.createElement(v.default,{size:"44",color:"#999"}));var s=this;return a=a.sort(n),c.default.createElement("div",null,c.default.createElement("div",{ref:"fund_mask",className:"fund_mask"},c.default.createElement("div",{ref:"d_mask",id:"d_mask"})),c.default.createElement("div",{ref:"searchBox",className:"d-search"},c.default.createElement("span",{className:"search_img"}),c.default.createElement("input",{ref:"city_val",id:"val",onChange:this.handleChange,type:"text",placeholder:"可输入中文、拼音进行查找城市"}),c.default.createElement(N.default,{onTap:this.clearIptval},c.default.createElement("span",{style:{display:this.state.noval},className:"clear_img"}))),c.default.createElement("div",{style:{position:"absolute",top:"NO"==_.qsParams.showTitleBar||0==_.qsParams.showTitleBar||PG.Device.SDK?"44px":"84px",left:0,right:0,bottom:0,overflowY:"scroll",WebkitOverflowScrolling:"touch"}},c.default.createElement("ul",{ref:"city_list",id:"city_list",style:{backgroundColor:"white"}},this.state.display_all?c.default.createElement("div",{style:{display:this.state.show_item}},c.default.createElement("p",{className:"current_city_p"},"当前城市"),c.default.createElement(N.default,{onTap:this.state.current_code&&1!=this.state.city_status?function(){return t.handleNext(t.state.current_code,t.state.current_city)}:function(){}},c.default.createElement("div",{className:"current_city",style:{display:this.state.show_item}},c.default.createElement("p",{className:"urrent_city_p_Sec",style:{color:1==this.state.city_status?"#cdcdcd":"#333"}},c.default.createElement("i",{className:"cityicon ion-location"}),c.default.createElement("span",{className:"citycontext"},this.state.current_city))))):null,c.default.createElement("p",{className:"current_city_p"},"选择城市"),a.map(function(e,a){return c.default.createElement("div",{key:"securityList"+a,className:"itemList"},c.default.createElement("li",{className:(0,g.makePy)(e.city_name)[0].substring(0,1),key:"cityname"+a},c.default.createElement(N.default,{onTap:1==e.status?t.nullfn.bind(s):t.handleNext.bind(s,e.area_code,e.city_name)},c.default.createElement("div",{className:"bank-item"},c.default.createElement("i",{className:"icon i-"+e.area_code}),c.default.createElement("span",{className:1==e.status?"tit-st":"tit"},1==e.status?e.city_name+"(正在维护中)":e.city_name),c.default.createElement("b",{className:"bank-itemico ion-ios-arrow-right"})))))}))))}},{key:"nullfn",value:function(){}},{key:"handleNext",value:function(t,e){var a=this.context.history.pushState;_.qsParams.cityName=e,a({city_name:e},"/security/"+t,_.qsParams)}},{key:"clearIptval",value:function(){this.refs.city_val.value="",this.setState({securityList:this.data,show_item:"block",noval:"none"})}}]),e}(c.default.Component);P.contextTypes={history:o.PropTypes.history},t.exports=P}).call(this)}finally{}},821:function(t,e,a){try{(function(){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,a,i){return a&&t(e.prototype,a),i&&t(e,i),e}}(),l=function(t,e,a){for(var i=!0;i;){var n=t,s=e,r=a;i=!1,null===n&&(n=Function.prototype);var l=Object.getOwnPropertyDescriptor(n,s);if(void 0!==l){if("value"in l)return l.value;var c=l.get;if(void 0===c)return;return c.call(r)}var o=Object.getPrototypeOf(n);if(null===o)return;t=o,e=s,a=r,i=!0,l=o=void 0}},c=a(2),o=i(c),u=a(16),d=a(6),f=i(d),y=a(7),m=i(y),h=a(18),p=i(h),v=a(11),_=i(v),b=a(1),E=a(9),g=i(E),k=a(8),N=a(113),w=a(237),P=i(w),C=a(39),S=a(12),T=i(S),x=a(10),L=i(x),O=function(t){function e(t,e){n(this,a),l(Object.getPrototypeOf(a.prototype),"constructor",this).call(this,t,e),this.renderFunds=this.renderFunds.bind(this),this.handleNext=this.handleNext.bind(this),this.handleChange=this.handleChange.bind(this),this.clearIptval=this.clearIptval.bind(this),this.state={provincetyList:[],name:"",fail:!1,current_city:"",show_item:"block",current_code:"",noval:"none",city_status:"",city:"",flag:!1,ProvinceFlag:!0,funds:[],loading:!0,showcity:null,frontConf:T.default.frontConf[T.default.taskType]},this.data=[],this.CityListData=[],this.val=""}s(e,t),r(e,null,[{key:"contextTypes",value:{history:u.PropTypes.history},enumerable:!0}]),r(e,[{key:"componentDidMount",value:function(){var t=this;0==this.state.frontConf.securityCityMode?(PG.refreshTitle("选择社保省份"),this.getCurrentCity(),this.setState({loading:!1,showcity:!1}),(0,k.fetchList)({taskType:"security",options:{type:"province"}}).then(function(e){t.setState({provincetyList:e}),t.data=e}).catch(function(e){return t.setState({fail:!0})}),(0,k.fetchList)({taskType:"security",options:{type:"city"}}).then(function(e){t.CityListData=e}).catch(function(e){return t.setState({fail:!0})})):(PG.refreshTitle("选择社保城市"),this.setState({loading:!1,showcity:!0}))}},{key:"getCurrentCity",value:function(){var t=this;this.setState({current_city:"正在获取中..."});var e=document.querySelector("#securityPosition");e&&document.body.removeChild(e),window.locate=function(e){var a=e&&e.content&&e.content.address_detail.city||null,i=void 0;return a?(a=a.replace("市",""),i="北京"==a||"天津"==a||"上海"==a||"重庆"==a?a:e&&e.content&&e.content.address_detail.province&&e.content.address_detail.province.replace("省","")||null,void(0,k.fetchList)({taskType:"security",options:{type:"city",province:i}}).then(function(e){e.map(function(e){a==e.city_name&&(t.setState({current_code:e.area_code,city_status:e.status}),t.setState({current_city:1!=e.status?a:a+"(正在维护中)"}))})}).catch(function(t){console.log(t)})):void t.setState({current_city:"无法获取您的定位"})};var a=document.createElement("script");a.src="https://api.map.baidu.com/location/ip?ak=uZMTxGSHnl4j6Bi1DtY2e4XtBzrSbXyz&callback=locate",a.id="securityPosition",document.getElementsByTagName("body")[0].appendChild(a)}},{key:"render",value:function(){var t=this,e=this.renderFunds,a=e();return this.state.fail&&(a=o.default.createElement("div",{className:"centered"},"网络异常,请稍后再试")),o.default.createElement("div",{className:"mx-view bank-list-page"},"NO"==b.qsParams.showTitleBar||0==b.qsParams.showTitleBar||PG.Device.SDK?null:o.default.createElement("div",{ref:"titleBar",style:{height:"NO"==b.qsParams.showTitleBar||PG.Device.SDK?0:44}},o.default.createElement(f.default,{title:"选择社保省份",left:o.default.createElement(m.default,{onTap:function(){g.default.call(t)}},o.default.createElement("i",{className:"ion-chevron-left"}))})),o.default.createElement("div",{ref:"fund_mask",className:"fund_mask"},o.default.createElement("div",{ref:"d_mask",id:"d_mask"})),o.default.createElement("div",{ref:"searchBox",className:"d-search"},o.default.createElement("span",{className:"search_img"}),o.default.createElement("input",{ref:"city_val",id:"val",onChange:this.handleChange,type:"text",placeholder:"可输入中文、拼音进行查找城市"}),o.default.createElement(L.default,{onTap:this.clearIptval},o.default.createElement("span",{style:{display:this.state.noval},className:"clear_img"}))),o.default.createElement(p.default,null,a))}},{key:"handleChange",value:function(t){this.state.ProvinceFlag&&this.setState({ProvinceFlag:!1});for(var e=this.refs.city_val.value,a=[],i=0;i<this.CityListData.length;i++)e!=this.CityListData[i].city_name&&(0,N.pinyin)(this.CityListData[i].city_name)!=e.toLowerCase().trim()||a.push(this.CityListData[i]);for(var i=0;i<this.CityListData.length;i++)if(this.CityListData[i].city_name.indexOf(e)!=-1||(0,N.pinyin)(this.CityListData[i].city_name).indexOf(e.toLowerCase().trim())!=-1){for(var n=!1,s=0;s<a.length;s++)a[s]==this.CityListData[i]&&(n=!0);n||a.push(this.CityListData[i])}0==a.length&&this.setState({flag:!0}),this.setState({funds:a}),8!=t.keyCode&&this.setState({show_item:"none",noval:"block"}),""==e.trim()&&this.setState({provincetyList:this.data,show_item:"block",noval:"none",ProvinceFlag:!0})}},{key:"sort_list",value:function(t,e){return(0,N.makePy)(t)[0]>(0,N.makePy)(e)[0]?1:-1}},{key:"city_sort_list",value:function(t,e){return(0,N.makePy)(t.city_name)[0]>(0,N.makePy)(e.city_name)[0]?1:-1}},{key:"renderFunds",value:function(){var t=this;if(this.state.showcity)return o.default.createElement(P.default,{province:"showcity",location:this.props.location,history:this.props.history});var e=function(){var e=t.state,a=e.provincetyList,i=e.flag,n=e.funds,s=e.loading,r=t.sort_list,l=t.city_sort_list,c=t;return 0===a.length&&!i||s?{v:o.default.createElement("div",{className:"centered"},o.default.createElement(_.default,{size:"44",color:"#999"}))}:(a=a.sort(r),n=n.sort(l),{v:o.default.createElement("div",{style:{position:"absolute",top:"NO"==b.qsParams.showTitleBar||0==b.qsParams.showTitleBar||PG.Device.SDK?"44px":"84px",left:0,right:0,bottom:0,overflowY:"scroll",WebkitOverflowScrolling:"touch"}},o.default.createElement("ul",{ref:"city_list",id:"city_list",style:{backgroundColor:"white"}},o.default.createElement("div",null,o.default.createElement("div",{style:{display:t.state.show_item}},o.default.createElement("p",{className:"current_city_p"},"当前城市"),o.default.createElement(L.default,{onTap:t.state.current_code&&1!=t.state.city_status?function(){return t.handleNext(t.state.current_code,t.state.current_city)}:function(){}},o.default.createElement("div",{className:"current_city",style:{display:t.state.show_item}},o.default.createElement("p",{className:"urrent_city_p_Sec",style:{color:1==t.state.city_status?"#cdcdcd":"#333"}},o.default.createElement("i",{className:"cityicon ion-location"}),o.default.createElement("span",{className:"citycontext"},t.state.current_city))))),t.state.ProvinceFlag?o.default.createElement("p",{className:"current_city_p"},"选择省份"):o.default.createElement("p",{className:"current_city_p"},"选择城市")),t.state.ProvinceFlag?a.map(function(e,a){return o.default.createElement("div",{key:"provincetyList"+a,className:"itemList"},o.default.createElement("li",{className:(0,N.makePy)(e)[0].substring(0,1),key:"provincety"+a},o.default.createElement(L.default,{onTap:t.handleSecond.bind(c,e)},o.default.createElement("div",{className:"bank-item"},o.default.createElement("i",{className:"icon"}),o.default.createElement("span",{className:"tit"},e),o.default.createElement("b",{className:"bank-itemico ion-ios-arrow-right"})))))}):0===n.length?o.default.createElement("p",{className:"no_city_wrap"},"暂无相关城市"):n.map(function(t,e){return o.default.createElement("div",{key:"itemList_"+e,className:"itemList"},o.default.createElement("li",{className:(0,N.makePy)(t.city_name)[0].substring(0,1),key:"cname"+e},o.default.createElement(L.default,{onTap:1==t.status?function(){return!1}:c.handleNext.bind(c,t.area_code,t.city_name)},o.default.createElement("div",{className:"bank-item"},o.default.createElement("i",{className:"icon i-"+t.area_code}),o.default.createElement("span",{className:1==t.status?"tit-st":"tit"},1==t.status?t.city_name+"(正在维护中)":t.city_name),o.default.createElement("b",{className:"bank-itemico ion-ios-arrow-right"})))))})))})}();return"object"==typeof e?e.v:void 0}},{key:"handleNext",value:function(t,e){var a=this.context.history.pushState;b.qsParams.cityName=e,a({},"/security/"+t,b.qsParams)}},{key:"handleSecond",value:function(t){var e=this.context.history.pushState;e({},"/securityCities/"+encodeURIComponent(t),b.qsParams)}},{key:"clearIptval",value:function(){this.refs.city_val.value="",this.setState({provincetyList:this.data,show_item:"block",noval:"none",ProvinceFlag:!0})}}]);var a=e;return e=(0,C.observer)(e)||e}(o.default.Component);e.default=O,t.exports=e.default}).call(this)}finally{}}});