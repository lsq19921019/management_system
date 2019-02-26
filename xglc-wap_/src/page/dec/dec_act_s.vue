<template>
  <div id="s_act">
    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <div class="s_header">
      <img class="" src="static/img/s_dec_act.jpg">
    </div>
    <div class="s_center">
      <div class="inputContainer">
        <input type="number" name="cellphone" id="phoneNumber" maxlength="11" placeholder="请输入11位手机号" v-model="id" />
      </div>
      <div class="inputContainer">
        <input type="password" name='password' id="password" maxlength="15" placeholder="请设置登录密码6-20位" v-model="pw" />
      </div>
      <div class="inputContainer">
        <input type="number" name="photoCode" id="photoCode" maxlength="4" placeholder="请输入验证码" v-model="codenum" />
        <div class="imgCodeBox"><img id="imgCode" src="" alt="" /></div>
        <div class="clear"></div>
      </div>
      <!-- <div id="slideVerify"></div> -->
      <div id="messVerify" class="inputContainer">
        <input type="number" name='messagecode' id="validateCode" placeholder="短信验证码" v-model="sms" />
        <button id="validateCodeBth">获取</button>
      </div>
      <div class="btn_img">
        <img id="img_btn" src="static/img/dec_888btn.png">
      </div>
    </div>
    <div class="s_footer">
      <img src="static/img/s_dec_footlogo.0.1.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'dec_act_s',
  data() {
    return {
      id: "",
      sms: "",
      pw: "",
      codenum: "",
    }
  },
  watch: { //输入位数限制
    'id': function(val) {
      if (this.id.length > 11) {
        this.id = val.slice(0, 11)
      }
    },
    'sms': function(val) {
      if (this.sms.length > 6) {
        this.sms = val.slice(0, 6)
      }
    },
    'pw': function(val) {
      if (this.pw.length > 20) {
        this.pw = val.slice(0, 20)
      }
    },
    'codenum': function(val) {
      if (this.codenum.length >= 4) {
        this.codenum = val.slice(0, 4)
      }
    },
  },
  created() {
    this.chBg("#dc3a24")
  },
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg
    },
  },
  mounted() {
    var outUrl = this.$route.query.stype
    $(function() {
      $('input#phoneNumber').blur(function() {
        var self = this;
        if ($(self).val()) {
          if (base.checkPhone($(self).val())) {
            requestImgFunc($(self).val());
          }
        }
      });
      $('img#imgCode').on('click', function(event) {
        requestImgFunc($('input#phoneNumber').val());
      });
      //倒计时
      var countdown = function(id) {
        var codeTime = 60;
        var codeState = "";
        var st = setInterval(function() {
          if (codeTime > 1) {
            codeState = (--codeTime + 's');
          } else {
            codeState = '重新获取';
            isRepeatSubmit = true;
            requestImgFunc($('input#phoneNumber').val())
            clearInterval(st)
          }
          $("#" + id).text(codeState);
        }, 1000);
      }
      //获取图片验证码
      var requestImgFunc = function(number) {
        var phoneNumber = number || '15888888888';
        $.ajax({
          type: "POST",
          headers: {
            "clientType": base.dataWithoutToken.clientType,
            "clientVersion": base.dataWithoutToken.clientVersion,
            "timeStamp": base.dataWithoutToken.timeStamp,
            "sign": base.getPostStrWithoutToken({
              cellphone: phoneNumber
            }),
            "imei": base.dataWithoutToken.timeStamp
          },
          data: {
            cellphone: phoneNumber
          },
          dataType: 'json',
          async: false,
          url: '/api/img/code',
          success: function(data) {
            if (data.status == 0) {
              $('img#imgCode').attr('src', 'data:image/png;base64,' + data.result);
            }
          }
        });

      }
      //短信验证码
      var GetSmsCode = function(cellphone, type, photoCode, /*session, sig, ncToken, ncScene*/ ) {
        if (base.checkPhone(cellphone)) {
          if (photoCode.length == 4) {
            if (isRepeatSubmit) {
              isRepeatSubmit = false;
              var urlN = "/api/sms/register";
              var dataJson = {
                "cellphone": cellphone,
                "type": type,
                /*"session": session,
                "sig": sig,
                "ncToken": ncToken,
                "scene": ncScene,*/
                'sendType': 0,
                "imgCode": photoCode,
              }
              $.ajax({
                type: "POST",
                headers: {
                  "clientType": base.dataWithoutToken.clientType,
                  "clientVersion": base.dataWithoutToken.clientVersion,
                  "timeStamp": base.dataWithoutToken.timeStamp,
                  "sign": base.getPostStrWithoutToken(dataJson),
                  "imei": base.dataWithoutToken.timeStamp
                },
                dataType: 'json',
                async: false,
                data: dataJson,
                url: urlN,
                success: function(data) {
                  if (data.status == "0") {
                    countdown("validateCodeBth"); //倒计时完成可点击
                  } else {
                    mui.alert(data.msg)
                    isRepeatSubmit = true; //报错可点击
                    requestImgFunc($('input#phoneNumber').val())
                  };
                }
              });
            }
          } else {
            mui.alert("请输入图形验证码")
          }
        }
      }
      //提交注册
      var registerNow = function(cellphone, messageCode, password, sourceType) {
        var urlN = "/api/user/register";
        var dataJson = {
          'cellphone': cellphone,
          'code': messageCode,
          'password': password,
          'sourceType': sourceType
          //'referrer': referrer
        };
        /*if (base.trimEmpty(referrer) != "") {
          dataJson.referrer = referrer;
        }*/

        var register = base.DES3.encrypt(base.desKey, JSON.stringify(dataJson));

        $.ajax({
          type: "POST",
          headers: {
            "clientType": base.dataWithoutToken.clientType,
            "clientVersion": base.dataWithoutToken.clientVersion,
            "timeStamp": base.dataWithoutToken.timeStamp,
            "sign": base.getPostStrWithoutToken({ "register": register }),
            "imei": base.dataWithoutToken.timeStamp
          },
          dataType: 'json',
          async: false,
          data: { "register": register },
          url: urlN,
          success: function(data) {
            if (data.status == "0") {
              window.location.href = "/reg_success";
            } else {
              mui.alert(data.msg)
              requestImgFunc($('input#phoneNumber').val())
            }
          }
        });
      }
      //滑动验证
      /*var session = ''
      var sig = ''
      var ncToken = ''
      var ncScene = ''
      var aLiVerify = function() {
        var nc_appkey = 'FFFF00000000017940A2'; //  应用标识,不可更改
        var nc_scene = 'login_h5'; //场景,不可更改
        var nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        var nc_option = {
          renderTo: '#slideVerify', //渲染到该DOM  ID指定的Div位置
          appkey: nc_appkey,
          scene: nc_scene,
          token: nc_token,
          //trans: '{"name1":"code100"}', //测试用，特殊nc_appkey时才生效，正式上线时请务必要删除；code0:通过;code100:点击验证码;code200:图形验证码;code300:恶意请求拦截处理
          callback: function(data) { //  校验成功回调
            session = data.csessionid
            sig = data.sig
            ncToken = nc_token
            ncScene = nc_scene
            $("#messVerify").show()
          },
          error: function(s) {},
          verifycallback: function(data) {
            if (data.code == "200") {}
          }
        };
        NoCaptcha.init(nc_option);
        NoCaptcha.setEnabled(true);
      }*/
      //开始
      var sourceType = outUrl;
      if (sourceType == null) {
        sourceType = 1
      }
      var isRepeatSubmit = true; //获取短信验证码
      requestImgFunc()
      //aLiVerify() //运行滑动验证码检测
      $("#validateCodeBth").on("click", function() { //获取短信验证码
        var cellphone = $("input[name='cellphone']").val();
        var photoCode = $("input[name='photoCode']").val();
        GetSmsCode(cellphone, "1", photoCode, /*session, sig, ncToken, ncScene*/ );
      })
      $("#img_btn").on("click", function() { //注册按钮
        var cellphone = $("input[name='cellphone']").val();
        var messageCode = $("input[name='messagecode']").val();
        var messageCodeN = base.trimEmpty(messageCode);
        var password = $("input[name='password']").val();
        var passwordN = base.trimEmpty(password);
        if (base.checkPhone(cellphone)) {
          if (passwordN == "") {
            mui.alert("密码不能为空");
          } else {
            if (messageCodeN == "") {
              mui.alert("请输入短信验证码");
            } else {
              registerNow(cellphone, messageCodeN, passwordN, sourceType);
            }
          }
        }
      })
      $('#foot_reg').click(function() {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
      });
    })
  }
}

</script>
<style scoped>

.clear {
  clear: both;
}

#s_act .s_header img {
  width: 100%;
  display: block;
}

#s_act .s_center {
  margin-top: -49px;
}

#s_act .inputContainer {
  width: 80%;
  margin: 0 auto;
}

#s_act #slideVerify {
  width: 88%;
  margin: 0 auto;
  margin-bottom: 20px;
}

#s_act .inputContainer input {
  width: 100%;
  margin-bottom: 15px;
  height: 18px;
  text-indent: 25px;
  line-height: 18px;
  padding: 13px 0;
  background: #fff;
  font-family: "Microsoft Yahei";
  font-size: 15px;
  border: none;
  outline: none;
  border-radius: 4px;
}

#s_act .imgCodeBox {
  height: 44px;
  width: 35%;
  float: right;
}

#s_act .imgCodeBox img {
  display: block;
  width: 100%;
  height: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

#s_act .inputContainer input#validateCode,
#s_act .inputContainer input#photoCode {
  border-radius: 0;
  width: 65%;
  float: left;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

#s_act .inputContainer button#validateCodeBth {
  width: 35%;
  border: none;
  outline: none;
  border-radius: 0;
  height: 44px;
  background: #f55e4a;
  color: #fff;
  float: right;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

#s_act .btn_img {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 46px;
}

#s_act .btn_img img {
  display: block;
  width: 100%;
}

#s_act .s_footer img {
  width: 51%;
  display: block;
  margin: 0 auto;
  margin-bottom: 32px;
}

</style>
