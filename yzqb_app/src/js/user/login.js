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
        


!function(global, userUtil, layer, dataUtil) {	
    check_app_status();
    
    //piece of shit 1: 2018-12-14 17:41  author:liusiqi;
    var sessionId=userUtil.sid();
    if(sessionId){
        window.location.href=global.localUrl+"index.html";
        return;
    }

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
            HYQ:u.indexOf("HYQ") > -1

        };
    };
    var browser = browserObj();
    //是否桥接初始化      
    var isBridgeInit = false;
    //移动设备id;
    var deviceId = '';
    //app桥接方法。
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function() {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }
        function setupWebViewJavascriptBridge(callback){
            if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
            if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            // WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        }


            if(browser.ios){
                // alert('ios');
                connectWebViewJavascriptBridge(function(bridge){ 
                    // alert('ios_in');
                    if(!isBridgeInit){
                        bridge.init(function(message, responseCallback){});
                    }
                    isBridgeInit = true;
                    bridge.callHandler('getDeviceInfo', {}, function responseCallback(responseData){
                        var res = JSON.parse(responseData);
                        // alert(res.result.deviceId);
                        if(parseInt(res.status)===0){
                            // alert(res.result.deviceId);
                            deviceId = res.result.deviceId;
                        }else{
                            alert('获取设备信息失败！');
                        }
                    });
                })
            }else{
                connectWebViewJavascriptBridge(function(bridge){ 
                    if(!isBridgeInit){
                        bridge.init(function(message, responseCallback){});
                    }
                    isBridgeInit = true;
                    bridge.callHandler('getDeviceInfo', {}, function responseCallback(responseData){
                        var res = JSON.parse(responseData);
                        // alert(res.result.deviceId);
                        if(parseInt(res.status)===0){
                            // alert(res.result.deviceId);
                            deviceId = res.result.deviceId;
                        }else{
                            alert('获取设备信息失败！');
                        }
                    });
                })
            }

      //存贮浏览器界面高度
      var localH=localStorage.getItem("localH")
      if(!localH){
          localH=localStorage.setItem("localH",document.documentElement.clientHeight)
      }
      $('#txtMobile').val(userUtil.mobile() !=null ? userUtil.mobile() : '');
      // 图形验证码
    //   alert(global.localUrl);
      function changeImgCode() {
          if ($("#btnImgCode").hasClass("dis")) {
              return;
          }
          $("#btnImgCode").addClass("dis");
          userUtil.ajax({
              url: global.localUrl + "nw/system/randomImage",
              data: {
                  ss: new Date().getMilliseconds()
              },
              done:function(re){
                  $("#btnImgCode").removeClass("dis");
                  if (1 == re.code) {
                      $("#hdImgCodeID").val(re.data.imgSessionId);
                      $("#btnImgCode").attr("src", "data:image/jpeg;base64," + re.data.imgBase64);
                  }
              }
          });
      }
      $("#btnImgCode").on("click", function () {
          changeImgCode();
      });
      changeImgCode();

        //  验证码
        $("#btnCode").on("click", function () {


            var $this = $(this);
            if (!$this.hasClass("dis") && validateMobile() && validateImgCode()) {
                $this.addClass("dis");
                var _model = getModel();
                var _data = {
                    mobileNumber: _model.mobileNumber,
                    inCode: _model.inCode,
                    imgSessionId: _model.imgSessionId,
                    smsType:"LOGIN",
                    "channel":"70",
                    ss: new Date().getMilliseconds()
                };
                userUtil.mobile(_data.mobileNumber);
                $.ajax({
                    url: global.localUrl + "nw/system/smsCode",
                    type: "post",
                    data: JSON.stringify(_data),
                    contentType: 'application/json;charset=utf-8',
                    success: function (re) {
                        if (1 == re.code) {
                            showWaitTips();
                            $('#txtCode').focus();
                        }
                        else if(1033 == re.code){
                            changeImgCode();
                            $("#txtImgCode").val("");
                            $this.removeClass("dis");
                            layer.tips(re.message);
                            setTimeout(function(){
                                window.location.href = "../help/refused.html";  //跳转引流页面
                            },1000);
                        }else {
                            changeImgCode();
                            $("#txtImgCode").val("");
                            $this.removeClass("dis");
                            layer.tips(re.message);
                        }
                    },
                    error: function () {
                        $this.removeClass("dis");
                        layer.tips(global.netError);
                    }
                });
            }
        });
        
        // 验证码倒计时
        function showWaitTips() {
            var $btnCode = $("#btnCode");
            var s = 60;
            $btnCode.text("已发送(" + s + ")").addClass("dis");
            var sv = setInterval(function () {
                if (s > 1) {
                    s--;
                    $btnCode.text("已发送(" + s + ")");
                } else {
                    $btnCode.text("重新获取").removeClass("dis");
                    clearInterval(sv);
                }
            }, 1000);
        }

        //  注册
      $("#loginBtn").on("click", function () {
          var $this = $(this);
          if (!$this.hasClass("dis") && validateMobile() && validateImgCode() && validateCode()) {
              $this.addClass("dis");
              var _model = getModel();
              var _data =  {
                "mobileNumber":_model.mobileNumber,
                "smsCode": _model.smsCode,
                "userType":"LOGIN",
                "channel":70,
                // 'deviceId':deviceId,
                // ss: new Date().getMilliseconds()
              };
              $('.layer_mask').addClass('on');
              $.ajax({
                  url: global.localUrl + "nw/users/signup",
                  type: "post",
                  data: JSON.stringify(_data),
                  contentType: 'application/json;charset=utf-8',
                  success: function (re) {
                      $('.layer_mask').removeClass('on');
                      if (1 == re.code) {
                        // $.ajax({
                        //     url: global.localUrl + "/nw/users/uploadDeviceInfoByH5",
                        //     type: "post",
                        //     data: JSON.stringify({
                        //         'deviceId':deviceId,
                        //         'userUuid':re.data.userUuid,
                        //         'sessionId':re.data.sessionId
                        //     }),
                        //     contentType: 'application/json;charset=utf-8',
                        //     success: function (res) {
                                    
                        //     },
                        //     error: function () {
                        //       $('.layer_mask').removeClass('on');
                        //         $this.removeClass("dis");
                        //         layer.tips(global.netError);
                        //     }
                        // });
                        layer.tips('登录成功');
                        userUtil.mobile(_model.mobileNumber)
                        userUtil.sid(re.data.sessionId)
                        userUtil.userID(re.data.userUuid)
                        //   localStorage.setItem('loginMobile',);
                        if(browser.HYQ){
                            function connectWebViewJavascriptBridge (callback) { if (window.WebViewJavascriptBridge) { callback(WebViewJavascriptBridge) } else { document.addEventListener( 'WebViewJavascriptBridgeReady' , function() { callback(WebViewJavascriptBridge) }, false ); } }
                            connectWebViewJavascriptBridge (function(bridge) { 
                            // bridge.registerHandler('JS Echo', function(data, responseCallback) { console.log("JS Echo called with:", data) responseCallback(data) }) 
                            bridge.callHandler('updateSession', {"sid":re.data.sessionId}, function responseCallback(responseData) { }) })
                            
                        }
                        setTimeout(function(){
                            // if(history.replaceState) {
                            //     history.replaceState({},null,'./2.html'); 
                            // } else {
                            //     location.href = '';
                            // }
                            window.location.href = "../apply/apply.html";  //跳转基本信息页面
                        },1000);
                      } else {
                          changeImgCode();
                          $("#txtImgCode").val("");
                          $("#txtCode").val("");
                          $this.removeClass("dis");
                          layer.tips(re.message);

                      }

                  },
                  error: function () {
                    $('.layer_mask').removeClass('on');
                      $this.removeClass("dis");
                      layer.tips(global.netError);
                  }
              });
          }
      });


      function getModel() {
          return {
              mobileNumber: $.trim($("#txtMobile").val()),
              inCode: $.trim($("#txtImgCode").val()),
              imgSessionId: $.trim($("#hdImgCodeID").val()),
              smsCode: $.trim($("#txtCode").val()),
              code: $.trim($("#txtCode").val()),
          }
      }
      function validateMobile() {
        var _model = getModel();
        if (!dataUtil.isMobile(_model.mobileNumber)) {
            layer.tips("请输入正确的手机号");
            return false;
        } 
        return true;
      }
      function validateCode() {
          var _model = getModel();
          if (!_model.code) {
              layer.tips("请输入短信验证码");
              return false;
          }
          return true;
      }
      function validateImgCode() {
          var _model = getModel();
          if (!_model.imgSessionId) {
              layer.tips("请刷新图形验证码");
              return false;
          } else if (!_model.inCode) {
              layer.tips("请输入图形验证码");
              return false;
          }
          return true;
      }

      $(".login_item3 img").click(function(){
        if($(".login_item3 img").attr("src")=="../images/bingo.png"){
          $(".login_item3 img").attr("src","../images/login_check.png");
          $(".login_btn").off("click");
        }else{
          $(".login_item3 img").attr("src","../images/bingo.png")
        }
      })
}(global, userUtil, layer ,dataUtil);