Date.prototype.format = function(fmt) { //author: meizz   
  var o = {
    "M+": this.getMonth() + 1, //月份   
    "d+": this.getDate(), //日   
    "h+": this.getHours(), //小时   
    "m+": this.getMinutes(), //分   
    "s+": this.getSeconds(), //秒   
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
    "S": this.getMilliseconds() //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
} //日期格式化

document.body.addEventListener('touchstart', function() {}); //div active效果

//获取地址栏参数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return "";
}

function checkTpid(ti) {
  for (var i = 0; i < tpidAr.length; i++) {
    if (ti == tpidAr[i].id) {
      return true
    } else {}
  }
}

var tpidAr = [
  { id: "kg", name: "8000000000001" },
  { id: "ys", name: "8000000000002" },
  { id: "tk", name: "8000000000003" },
  { id: "rs", name: "8000000000004" },
  { id: "yj", name: "8000000000005" },
  { id: "lt", name: "8000000000006" },
  { id: "mt", name: "8000000000007" },
  { id: "ht", name: "8000000000008" },
  { id: "td", name: "8000000000009" },
]

//ios10 禁止页面缩放
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  })
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false)
}
