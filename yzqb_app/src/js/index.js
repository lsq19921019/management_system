function check_app_status(){
    // alert(6666);
    var browserObj = function () {
        var u = navigator.userAgent;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: u.indexOf('Mobile') > -1, //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信
            qq: u.indexOf("QQBrowser") > -1, //是否QQ浏览器
            mobile_qq: u.indexOf("MQQBrowser") > -1, //是否是手机QQ浏览器
            uc: u.indexOf("UCBrowser") > -1, //是否是uc浏览器
            baidu: u.indexOf("Baidu") > -1, //是否是百度浏览器
            firefox: u.indexOf("Firefox") > -1, //是否是火狐浏览器
            lieBao: u.indexOf("LieBao") > -1, //是否是猎豹浏览器
            sogou: u.indexOf("SogouMobile") > -1, //是否是搜狗手机浏览器
            HYQ:u.indexOf("HYQ") > -1,
            HYQ_ios_version:((u.indexOf('yzqb_android_')>-1)),
            HYQ_android_iosversion:((u.indexOf('yzqb_iOS_')>-1)),
            total_info:u
        };
    };
    var browser = browserObj();
    var isBridgeInit = false;
    // function connectWebViewJavascriptBridge (callback) {
    //     if (window.WebViewJavascriptBridge) { 
    //             callback(WebViewJavascriptBridge)
    //     } else { 
    //             document.addEventListener( 'WebViewJavascriptBridgeReady' , function() { callback(WebViewJavascriptBridge) }, false ); 
    //     } 
    // }


    //校验app版本;       
    if(browser.HYQ){
        if(browser.HYQ_ios_version||browser.HYQ_android_iosversion){
            // setTimeout(function(){
            //     alert(navigator.userAgent);
            // },1000); 
            // alert('当前是最新版本!');
            // window.location.href='/index.html';
        }else{
            // setTimeout(function(){
            //     alert(navigator.userAgent);
            // },1000);
            // alert('请升级最新版本!');
            window.location.href='/help/updateAppPage.html';
            // setTimeout(function(){
            //     // window.location.href = 'http://h5.yzqianbao.com/help/downLoad.html';
            //     if(browser.ios){
            //         // window.location.href="https://www.pgyer.com/PxA8";//测试
            //         // window.location.href="itms-services://?action=download-manifest&url=https://image.yzqianbao.com/MyDownload/ios.plist";//线上
            //         window.location.href="itms-services://?action=download-manifest&url=https://yzqb-app.oss-cn-shenzhen.aliyuncs.com/yzqbapp/ios/ios.plist";//线上
            //         // window.location.href = 'https://yzqb-app.oss-cn-shenzhen.aliyuncs.com/yzqbapp/ios/YZQB-ios.ipa';
            //     }else{
            //         // window.location.href = global.localUrl + "hyq_test.apk";//测试   http://h5.yzqianbao.com/yzqb.apk
            //         // window.location.href = global.localUrl + "yzqb.apk";//线上
            //         window.location.href = 'https://yzqb-app.oss-cn-shenzhen.aliyuncs.com/yzqbapp/ad/youziqianbao-official-release-v1.0.0.apk';
            //     }
            // },3000);
        }
    }
}
!function(global, layer, userUtil, dataUtil){
    check_app_status();
  var sessionId=userUtil.sid();
  if(!sessionId){
    window.location.href=global.localUrl+"user/login.html";
    return;
  }
  
  //app交互
  var flag;
  var jsBridge = (function () {   

      function connectWebViewJavascriptBridge(callback) {
          if (window.WebViewJavascriptBridge) {
              callback(WebViewJavascriptBridge);
          } else {
              document.addEventListener('WebViewJavascriptBridgeReady', function () {
                  callback(WebViewJavascriptBridge);
              }, false)
          }
      }
      connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
          WebViewJavascriptBridge.init(function (message, responseCallback) {

          });
          WebViewJavascriptBridge.registerHandler("contactsList", function(data, responseCallback) {
              phoneNumbers=(data);
          });
          WebViewJavascriptBridge.registerHandler("contacts", function(data, responseCallback) {
              var datas=JSON.parse(data);
              if(currentNum==1){
                  name1=datas.name;
                  tel1=datas.phone;
                  $("#firstTxtName").val(datas.name);
                  $("#firstTxtTel").val(datas.phone);
              }else {
                  name2=datas.name;
                  tel2=datas.phone;
                  $("#secondTxtName").val(datas.name);
                  $("#secondTxtTel").val(datas.phone);
              }
          });
          WebViewJavascriptBridge.callHandler('getAppVersion', {}, function (response) { callback(response); });
          fn && fn();

      })
      return {
          init: function (fn) {
              connectWebViewJavascriptBridge(function (WebViewJavascriptBridge) {
                  WebViewJavascriptBridge.init(function (message, responseCallback) {

                  });

                  fn && fn();

              })
          },
          copyWechat: function (obj) {
              WebViewJavascriptBridge.callHandler('copyWechat', { pageID: obj.pageID }, function (response) { });
          },
          saveQR: function (obj) {
              WebViewJavascriptBridge.callHandler('saveQR', { pageID: obj.pageID }, function (response) { });
          },
          showAppPage: function (obj) {
              WebViewJavascriptBridge.callHandler('showAppPage', { pageID: obj.pageID }, function (response) { });
          },
          jumpTo: function (obj) {
              WebViewJavascriptBridge.callHandler('jumpTo', {}, function (response) { });
          },
          showWebPage: function (obj) {
          WebViewJavascriptBridge.callHandler('showWebPage', { title: obj.title, pageUrl: obj.pageUrl }, function (response) { });
          },
          getSid: function (callback) {
              WebViewJavascriptBridge.callHandler('getSid', {}, function (response) { callback(response); });
          },       
          getContacts: function (callback) {
              WebViewJavascriptBridge.callHandler('getContacts', {}, function (response) { callback(response); });
          },
            getAppVersion: function (callback) {
                WebViewJavascriptBridge.callHandler('getAppVersion', {}, function (response) { 
                  flag=response;
                  callback(response); 
                });
            }
      }
  })();
  
  function getOrders(){
    $.ajax({
        url: global.localUrl + "nw/orders/borrowingInfo",
        type: "post",
        data: JSON.stringify({"sessionId": sessionId}),
        contentType: 'application/json;charset=utf-8',
        success: function (re) {
            if (1 == re.code) {
              $.each(re.data,function(k,v){
                if(v.status == 1 ){    //有待提交
                    var conf = {
                        title: "快来申请",
                        content: "您当前有一笔订单待提交，享受<a>极速审核、实时放款</a>服务，快去补充信息吧。",
                        btnText: "马上补充信息",
                        btnEvent: function () {
                          window.location.href=global.localUrl + "trust/identification.html"
                        }
                    };
                    layer.alert(conf);
                    $(".layer_dialog_box").append("<i class='boxClose'></i>");
                    $(".boxClose").click(function(){
                      $(".alert").removeClass("on");
                    })
                }
              }); 

            }else{
                layer.tips(re.message);
            }
        },
        error: function () {
            layer.tips(global.netError);
        }
    });

  }
  //获取认证进展状态
  function getProgress(){
      $.ajax({
          url: global.localUrl + "nw/users/getUserCertificationStatus",
          type: "post",
          data: JSON.stringify({"sessionId": sessionId}),
          contentType: 'application/json;charset=utf-8',
          success: function (re) {
              if (1 == re.code) {
                if(re.data.userContactStatus!=1){
                  getOrders();
                }

              }else{
                  layer.tips(re.message);
              }
          },
          error: function () {
              layer.tips(global.netError);
          }
      });
  }
getProgress();     
  if(browser.HYQ){
      $(".downLoadBar").css({"display":"none"});
  }
  $(".downLoadBar img").click(function(){
    window.location.href = global.localUrl + "help/downLoad.html"
  })

  if(!userUtil.sid() || !userUtil.userID()){   //非登录状态
    layer.hideLoad();
    $('.game_con_img').on('click',function(){
      window.location.href="./user/login.html";
    });
    return;
  }

  if(userUtil.sid() && userUtil.userID()){    //登录状态
    getGameGameBalance();

    // if(!sessionStorage.getItem('isOverdue')){  //控制只显示一次弹框
    //   repaymentRemind();
    // }
    //关闭弹框
    $('.pop_close_icon').on('click',function(){
      $(this).parent().parent().addClass('hide');
    });
    $('.pop_close_icon_btn').on('click',function(){
      $('.pop_home03').addClass('hide');
    });
    $('#off_pophome04').on('click',function() {
        $('.pop_home04').addClass('hide');
    });

    // 马上开始
    $('#btnGoFK').on('click',function(){
      $('.pop_home03').removeClass('hide');
      $('#btnGoGame').attr('data-type','fk');
    })
    $('#btnGoTCS').on('click',function(){
      $('.pop_home03').removeClass('hide');
      $('#btnGoGame').attr('data-type','tcs');
    })
    $('#btnGoGame').on('click',function(){
      var _this = $(this);
      layer.showLoad();

      // 判断游戏币是否充足
      userUtil.ajax({
        url: global.localUrl + 'nw/users/checkGameGameBalance',
        data: {},
        done: function(re){
          layer.hideLoad();
          if(re.code == 1){
            if(re.data.status == 1){
              if(_this.attr('data-type') == 'tcs'){
                window.location.href=global.localUrl +"game/fruit.html"
                return;
              }

              if(_this.attr('data-type') == 'fk'){
                window.location.href=global.localUrl +"game/bird.html"
                return;
              }
            }else{
              //layer.tips('余额不足');
              $('.pop_home04').removeClass('hide');
              $('.pop_home03').addClass('hide');
              $('#goTowallet').click(function() {
                $('.pop_home04').addClass('hide');
                location.href = '/apply/apply.html';
              });
              return;
            }
          }
        }
      })

    });
  }

  // 获取游戏币余额
  function getGameGameBalance(){
    userUtil.ajax({
      url: global.localUrl + 'nw/users/getGameGameBalance',
      data: {},
      done: function(re){
        layer.hideLoad();
        $('#gameBalance').html('游戏币：'+re.data);
      }
    })
  }

}(global, layer, userUtil, dataUtil)