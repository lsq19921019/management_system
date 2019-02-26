<template>
  <div id="act_l">
    <div id="_umfp" style="display:inline;width:1px;height:1px;overflow:hidden"></div>
    <div class="header_l">
      <img class="" src="static/img/s_dec_act.jpg">
    </div>
    <div class="center_l">
      <div class="enter-box">
        <div class="inputContainer">
          <p class="friend">您的好友<span id="f-phone"></span>邀请您与TA一起理财</p>
        </div>
        <div class="inputContainer">
          <input type="number" name="cellphone" id="phoneNumber" maxlength="11" placeholder="请输入11位手机号" v-model="id" />
        </div>
        <div class="inputContainer">
          <input type="password" name='password' id="password" maxlength="20" placeholder="请设置登录密码6-20位" v-model="pw" />
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
          <div class="clear"></div>
        </div>
        <div class="btn_img">
          <img id="img_btn" src="static/img/dec_888btn.png">
        </div>
      </div>
      <div class="jianmian">
        <img class="bg" src="static/img/dec_invite_bg.png">
        <div class="jm-btn">
          <img id="center-reg" src="static/img/lottery_reg_btn.png">
        </div>
      </div>
      <div class="bao_zhang">
        <img class="title" src="static/img/l_dec_center_05.png">
        <img src="static/img/l_dec_center_06.0.1.png">
      </div>
      <div class="jian_jie">
        <h5 class="title">公司简介</h5>
        <p>小鸽理财是一家专注于为有资产的优质客户提供抵押或信用贷款的网络借贷信息中介服务平台，总部位于深圳市南山区。我司融合“互联网+金融”,一直以来秉持规范、安全、透明、诚信的经营准则，为用户提供T+1高效安全的互联网投融资信息中介服务。</p>
        <p>核心团队大部分来自国有银行，在10余年资深国有大银行系风控团队把关下，29道程序层层流转，兼用百度人脸识别技术，以及央行及8大征信机构验核体系，第三方机构担保和代偿协议，多重交叉审核等多维度确保标的资产安全可控。</p>
        <p>2017年9月，小鸽理财正式上线资金存管，平台不触碰资金。在线电子合同凭证第三方机构投资标担保+代偿等保障方式，为投资人的资金保驾护航。</p>
        <p class="bottom">层层体系，护航资金安全</p>
      </div>
      <div class="btn_img">
        <img id="foot_reg" src="static/img/dec_888btn.png">
      </div>
    </div>
    <div class="footer_l">
      <img src="static/img/s_dec_footlogo.0.1.png">
    </div>
    <div class="footer_b">
      <img src="static/img/l_dec_footer.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'dec_invite',
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
    var outId = this.$route.query.id
    var phone = this.$route.query.phone
    // 处理一下服务器给拼的加密字段 %2b有可能会被理解成空格 其实是+号
    if (phone && phone.indexOf(" ") > 0) {
      phone = phone.replace(/[ ]/, "+")
    }
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
      var registerNow = function(cellphone, messageCode, password, referrer) {
        var urlN = "/api/user/register";
        var dataJson = {
          'cellphone': cellphone,
          'code': messageCode,
          'password': password,
          "referrer": referrer
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
              mui.alert(data.msg, function() {
                requestImgFunc($('input#phoneNumber').val())
              });
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
      var referrer = phone;
      $("#f-phone").text(outId.substr(0, 3) + "****" + outId.substr(7))
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
              registerNow(cellphone, messageCodeN, passwordN, referrer);
            }
          }
        }
      })
      $('#foot_reg').on('click', function() {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
      })
      $('#center-reg').on('click', function() {
        $('html , body').animate({ scrollTop: 0 }, 'slow');
      })
    })
  }
}

</script>
<style lang="css" scoped>
.clear {
  clear: both;
}

#act_l {
  position: relative;
}

#act_l .header_l img {
  width: 100%;
  display: block;
}

#act_l .center_l {
  margin-top: -49px;
}

#act_l .enter-box {
  background: #fff;
  position: relative;
  z-index: 1;
  width: 93.3%;
  margin: 0 auto;
  padding: 18px 0 24px;
  margin-bottom: 14px;
}

#act_l .inputContainer {
  width: 85.7%;
  margin: 0 auto;
}

#act_l .inputContainer .friend {
  text-align: center;
  font-size: 14px;
  line-height: 26px;
  color: #545454;
  margin-bottom: 20px;
}

#act_l .inputContainer input {
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
  border: 1px solid #d5d5d5;
}

#act_l #slideVerify {
  width: 94%;
  margin: 0 auto;
  margin-bottom: 20px;
}

#act_l .imgCodeBox {
  height: 46px;
  width: 34%;
  float: right;
}

#act_l .imgCodeBox img {
  display: block;
  width: 100%;
  height: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

#act_l .inputContainer input#validateCode,
#act_l .inputContainer input#photoCode {
  border-radius: 0;
  width: 65%;
  float: left;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

#act_l .inputContainer button#validateCodeBth {
  width: 34%;
  border: none;
  outline: none;
  height: 46px;
  background: #f55e4a;
  color: #fff;
  float: right;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

#act_l .btn_img {
  width: 85.7%;
  margin: 0 auto;
}

#act_l .btn_img img {
  display: block;
  width: 100%;
}

#act_l .jianmian {
  width: 93.3%;
  margin: 0 auto;
  margin-bottom: 30px;
  position: relative;
}

#act_l .jianmian .bg {
  display: block;
  width: 100%;
}

#act_l .jianmian .jm-btn {
  position: absolute;
  bottom: 32px;
  left: 0;
}

#act_l .jianmian .jm-btn img {
  width: 85.7%;
  display: block;
  margin: 0 auto;
}

#act_l .bao_zhang {
  width: 91%;
  margin: 0 auto;
}

#act_l .bao_zhang img {
  display: block;
  width: 100%;
  margin-bottom: 20px;
}

#act_l .bao_zhang img.title {
  width: 72%;
  margin: 0 auto;
  margin-bottom: 20px;
}

#act_l .jian_jie {
  width: 82%;
  margin: 0 auto;
}

#act_l .jian_jie .title {
  font-size: 18px;
  line-height: 46px;
  color: #fff;
  text-align: center;
  position: relative;
}

#act_l .jian_jie .title:before {
  content: "";
  height: 1px;
  margin-top: 23px;
  background: #f0f0f0;
  width: 35%;
  position: absolute;
  left: 0;
  top: 0;
}

#act_l .jian_jie .title:after {
  content: "";
  height: 1px;
  margin-top: 23px;
  background: #f0f0f0;
  width: 35%;
  position: absolute;
  right: 0;
  top: 0;
}

#act_l .jian_jie p {
  font-size: 14px;
  line-height: 24px;
  color: #fff;
  text-indent: 2em;
}

#act_l .jian_jie p.bottom {
  padding-top: 20px;
  padding-bottom: 14px;
  color: #ffa181;
  text-align: center;
}

#act_l #foot_reg {
  margin-bottom: 32px;
}

#act_l .footer_l {
  z-index: 2;
  position: relative;
}

#act_l .footer_l img {
  width: 51%;
  display: block;
  margin: 0 auto;
  margin-bottom: 32px;
}

#act_l .footer_b {
  position: absolute;
  width: 100%;
  bottom: -32px;
  z-index: 1;
}

#act_l .footer_b img {
  display: block;
  width: 100%;
}

</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity .3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}

</style>