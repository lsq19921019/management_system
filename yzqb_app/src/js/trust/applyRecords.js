!(function(global,userUtil,layer,dataUtil){   
  $("body").height(document.documentElement.clientHeight);
	//申请记录
	getborrowingInfo();

  var stateConf = {
      1: { text: "待提交", operateTxt: "继续提交" },
      2: { text: "审核中", operateTxt: "" },
      3: { text: "放款中", operateTxt: "" },
      4: { text: "放款中", operateTxt: "" },
      5: { text: "待还款", operateTxt: "一键还款" },
      6: { text: "已还款", operateTxt: "" },
      7: { text: "审核不通过", operateTxt: "再次申请"},
      8: { text: "待还款", operateTxt: "一键还款" },
      9: { text: "已还款", operateTxt: "" },
      10: { text: "审核不通过", operateTxt: "" },
      11: { text: "还款处理中", operateTxt: "" },
      12: { text: "放款失败", operateTxt: "" },
  }
          

  $("#nqb").click(function(){
      markPoint()
      window.location.href="https://sspprod.lianzi360.com/security/demand?appId=b733612c17c4e0ace98419488e35e8af&dk=D3267A58EE45EF4E1B9D8DBF8B511477";
  })
  $('.noPass span').off('click').on("click",function(){
      window.location.href=global.localUrl +"help/helpcenter.html";
  });
  //埋点
  // var mobileNumber=localStorage.getItem("mobile");
  // function markPoint(){
  //     var _data={"type": 1,"mobileNumber": mobileNumber};
      
  //     $.ajax({
  //         url: global.localUrl+"web/userDiversionMsg",
  //         type: "post",
  //         data: JSON.stringify(_data),
  //         contentType: 'application/json;charset=utf-8',
  //         success: function (re) {
  //             if (1 == re.code) {
  //             } else{
  //             }
  //         },
  //         error: function () {
  //         }
  //     });
  // }
  
	function getborrowingInfo(){
		userUtil.ajax({
			url: global.localUrl+ 'nw/orders/borrowingInfo',
			data:{},
			done: function(re){
				layer.hideLoad();

        if(re.data==0){
          $("#borrowList").html("<div class='orderNone'>暂无订单</div>");

        }

				$.each(re.data,function(k,v){
          console.log(v.status )
          if(v.status == 10 ){
            $(".cooperationContain").css({"display":"block"})
          }          
          if(v.status == 7&&v.orderRemark){
            $(".cooperationContain").css({"display":"block"})
          }
          if(v.status == 1 || v.status == 5 || (v.status == 7&&v.orderRemark=="") || v.status == 8){    //有操作按钮
	          var $dom = $("<div class=\"recordContent\"><div class=\"recordList\">编号："+v.orderNo+"</div><div class=\"recordList\">申请金额："+v.borrowingAmount+"元</div><div class=\"recordList\">申请期限："+v.borrowingTerm+"</div><div class=\"recordList\">申请时间："+v.createTime+"</div><div class=\"recordList active_color\">"+v.orderRemark+"</div><div class=\"recordListBtnTop\">"+v.orderStatusDesc+"</div><div class=\"recordListBtnBottom\" data-uuid=\""+v.orderNo+"\" data-status=\""+v.status+"\">"+stateConf[v.status].operateTxt+"</div></div>");
					}else{
	          var $dom = $("<div class=\"recordContent\"><div class=\"recordList\">编号："+v.orderNo+"</div><div class=\"recordList\">申请金额："+v.borrowingAmount+"元</div><div class=\"recordList\">申请期限："+v.borrowingTerm+"</div><div class=\"recordList\">申请时间："+v.createTime+"</div><div class=\"recordList active_color\">"+v.orderRemark+"</div><div class=\"recordListBtnTop\">"+v.orderStatusDesc+"</div></div>");
					}
          $dom.appendTo("#borrowList");
				});

				$('.recordListBtnBottom').on("click",function () { 
					var _this = $(this);
          if (_this.attr("data-status") == 1) {
              window.location.href = "identification.html"
          } else if (_this.attr("data-status") == 5) {
              window.location.href = "repaymentDetail.html?orderNo="+_this.attr("data-uuid");
          } else if (_this.attr("data-status") == 7) {
              window.location.href = "../apply/apply.html";
          } else if (_this.attr("data-status") == 8) {
             	window.location.href = "repaymentDetail.html?orderNo="+_this.attr("data-uuid");
          } 
				});


				
			}
		})
	}


})(global,userUtil,layer,dataUtil)