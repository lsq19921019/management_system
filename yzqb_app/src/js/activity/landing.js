!function(global, userUtil, layer, dataUtil) {	
      //存贮浏览器界面高度
      var localH=localStorage.getItem("localH")
      if(!localH){
          localH=localStorage.setItem("localH",document.documentElement.clientHeight)
      }
      //$('#txtMobile').val(userUtil.mobile() !=null ? userUtil.mobile() : '');
      // 图形验证码
      function changeImgCode() {
          userUtil.ajax({
              url: global.localUrl + "nw/system/randomImage",
              data: {
                  ss: new Date().getMilliseconds()
              },
              done:function(re){
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
            if (validateMobile() && validateImgCode()) {
            // if (true) {
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
                    $btnCode.attr('disabled',true);
                    $btnCode.text("已发送(" + s + ")");
                } else {
                    $btnCode.text("重新获取").attr("disabled",false);
                    clearInterval(sv);
                }
            }, 1000);
        }

        //  注册
      $("#loginBtn").on("click", function () {
          var $this = $(this);
          if(!$('.ico').hasClass('ico_selected')) {
            layer.tips('请仔细阅读协议');
              return;
          }
          if (true) {
              var _model = getModel();
              var _data =  {
                "mobileNumber":_model.mobileNumber,
                "smsCode": _model.smsCode,
                "userType":"LOGIN",
                "channel":70
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
                          layer.tips('登录成功'); 
                          setTimeout(function() {
                              $('.down_app').removeClass('dsn');
                              $('.register_wrap').addClass('dsn');
                          },500);                         

                      } else {
                          changeImgCode();
                          $("#txtImgCode").val("");
                          $("#txtCode").val("");
                          layer.tips(re.message);
                      }
                  },
                  error: function () {
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

      $(".isoBtn").click(function(){
               
        if(browser.ios){
            // window.location.href="https://www.pgyer.com/PxA8";//测试
            window.location.href="itms-services://?action=download-manifest&url=https://image.yzqianbao.com/MyDownload/ios.plist";//线上
        }else{
            // window.location.href = global.localUrl + "hyq_test.apk";//测试
            window.location.href = global.localUrl + "yzqb.apk";//线上
        }

    })

      $(".ico").click(function(){
        var _this = $(this);
        if(!_this.hasClass('ico_selected')) {
            _this.addClass('ico_selected');
        } else {
            _this.removeClass('ico_selected');
        }
      })
}(global, userUtil, layer ,dataUtil);