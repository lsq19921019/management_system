!function(){var a=require("mod/tools"),t=a.apiUrl(),n={init:function(){n.withdrawRecord(),n.withdrwaApp(),n.withdrwa(),n.onEvent()},pageClick:function(a,t){a.on("click","a",function(){var n=1,d=1*a.find(".cur-page").text().split("/")[0],i=1*a.find(".cur-page").text().split("/")[1],e=$(this).attr("data-page");"first"===e?n=1:"prev"===e?n=d-1>0?d-1:1:"next"===e?n=i>d+1?d+1:i:"end"===e&&(n=a.attr("data-totalPage")),t(1*n)})},setPageDate:function(a,t){t.totalPage>1&&a.show(),a.attr("data-totalPage",t.totalPage),a.find(".all").text("共"+t.totalCount+"条"),a.find(".cur-page").text(t.currentPage+"/"+t.totalPage)},withdrwa:function(){a.fetchAjax(t.data+"/user/index").done(function(a){if(0==a.status){var t=a.result;$(".withdraw-body").find(".withing .withing-txt").text(t.withdrawAmount)}}),a.fetchAjax(t.data+"/assets/withdraw_index").done(function(a){if(0==a.status){$bankcard=$("#bankcard");var t=a.result;2==t.dealPasswordStatus&&($bankcard.find(".pay-password").attr("placeholder","请设置交易密码"),$bankcard.find(".withdraw-btn").addClass("disabled")),""!=t.cardNo?($(".nobind").css("display","none"),$(".bank-card").css("display","block")):($(".nobind").css("display","block"),$(".bank-card").css("display","none")),$bankcard.find(".bank-card").attr("data-bankid",t.cardId),$bankcard.find(".balance").attr("placeholder","可用余额"+t.userAmount+"元"),$bankcard.find(".name").text(t.bankName),$bankcard.find(".card-id").text(t.cardNo),$(".withdrawall").on("click",function(){$bankcard.find(".balance").val(t.userAmount),$bankcard.find(".balance").focus()})}})},withdrwaApp:function(){$bankcard=$("#bankcard"),$bankcard.find(".withdraw-btn").on("click",function(){var n=$bankcard.find(".balance").val()||"",d=$bankcard.find(".bank-card").attr("data-bankid"),i=$bankcard.find(".pay-password").val()||"",e={money:n,cardId:d,dealPassword:DES3.encrypt("b8a5483ed47744f7b4978104afdcc075",i)};n?i?a.fetchAjax(t.data+"/assets/withdraw",e).done(function(t){"0"==t.status?($bankcard.find(".balance").val(""),$bankcard.find(".pay-password").val(""),a.tipsAlert("提现成功"),setTimeout(function(){location.href="../withdrawRecord.html"},1500)):a.tipsAlert(t.msg||"提现失败")}):($bankcard.find(".pay-password").focus(),$bankcard.find(".tips-register").text("请输入交易密码").fadeIn()):($bankcard.find(".balance").focus(),$bankcard.find(".tips-register").text("请输入提现金额").fadeIn())})},onEvent:function(){$withdraw=$(".withdraw-content"),$withdraw.find(".bankid").click(function(){window.location.href="../safe.html"})},withdrawRecord:function(){var d=$(".withdraw-body"),i=d.find(".page-list"),e=function(d){var e={pageNum:d||1};a.fetchAjax(t.data+"/assets/balance_list",e).done(function(t){if(0==t.status){var d=t.result&&t.result.list;console.log(t);var e=t.result&&t.result.pageEntity;a.renderTpl($(".table-list .banklist-hbs"),$("#banklist-template"),{banklist:d}),0==d.length?$(".null-tips").show():$(".null-tips").hide(),n.setPageDate(i,e)}})};e(),n.pageClick(i,function(a){e(a)})}};n.init()}();