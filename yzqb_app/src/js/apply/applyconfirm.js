!function(global, layer, userUtil, dataUtil,browser){

	// var urlParams = location.search ? global.query : {};
	 var postData = {
         "userUuid":userUtil.userID() ,
         "sessionId": userUtil.sid()
	 };
	 
	// if(urlParams.userUuid){
	// 	postData.userUuid = urlParams.userUuid;
	// }
	 console.log(postData);
    initProduct();
	function initProduct(){
		layer.showLoad();
		$.ajax({
			url: global.localUrl + "xjbk/system/initProduct",
			data: JSON.stringify(postData),
			type: "post",
      contentType: 'application/json;charset=utf-8',
      success: function (re) {
          layer.hideLoad();
          if (1 == re.code) {
			//   alert(Math.ceil(re.data[0].borrowingAmount));
			$("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount));
          	// $("#arriveMoney").html(Math.ceil(re.data[0].borrowingAmount-re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
						$("#arriveGameCoin").html(Math.ceil(re.data[0].gameRechargeRateMin*re.data[0].borrowingAmount));
						$("#repaymentAmount").html(re.data[0].repaymentAmount+"元");
						$("#borrowingAmount").html(re.data[0].borrowingAmount+"元");
						$("#borrowingTerm").html(re.data[0].borrowingTerm+"天");
          }
          else{
              layer.tips(re.message);
          }
      },
      error: function () {
          layer.hideLoad();
          layer.tips(global.netError);
      }
		})
	};



	$("#btnReg").on('click',function(){
		layer.showLoad();
		//console.log(global.query["user_name"]);
		$.ajax({
			url: global.localUrl + "xjbk/auth",
			data: JSON.stringify({
				user_name: global.query["user_name"],
				user_phone: global.query["user_phone"],
				user_idcard: global.query["user_idcard"],
				return_url: global.query["return_url"],
				sign: global.query["sign"]
			}),
			type: "post",
			contentType: 'application/json;charset=utf-8',
			success: function (re) {
				layer.hideLoad();
				if (1 == re.status) {
					// if(window.location.href.indexOf('?')>-1){
					// 	window.location.replace(re.response.url+'&bind_status=200&type=success');
					// }else{
					// 	window.location.replace(re.response.url+'?bind_status=200&type=success');
					// }
					// alert(re.response.url+'?bind_status=200&type=success');
					window.location.href =re.response.url+'?bind_status=200&type=success';
				}else{
					layer.tips(re.message);
				}
			},
			error: function () {
				layer.hideLoad();
				layer.tips(global.netError);
				// window.location.replace(re.response.url+'&bind_status=200');
			}
		})
	});
	

	$("#downLoad").on("click",function(){
		if(browser.ios){
			  window.location.href="itms-services://?action=download-manifest&url=https://image.yaoqianguan.com/iosqiandai/manifest.plist";
			return;
		}
		if(browser.android){
			window.location.href = "http://baika.bajiehebao.com/bjqd.apk";
			return;
		}
	});

}(global, layer, userUtil, dataUtil,browser)