(function(){
	function resize(){
		var oWidth=document.documentElement.clientWidth||document.body.clientWidth;
		document.documentElement.style.fontSize=oWidth/100+'px';
	}
	resize();
	window.addEventListener('resize',resize,false);

})()
var UrlPj={
  qiniuImg:'http://opcr7ahpg.bkt.clouddn.com/'
}
