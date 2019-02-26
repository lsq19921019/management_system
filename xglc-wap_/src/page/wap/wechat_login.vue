<template>
  <div>
    <div class="wechat-login">
      <div class="gif">
        <img src="/static/img/wechat_login.gif">
      </div>
      <p>tip：加载中...</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wx_cookie: "",
      fromPage: "",
      cellphone: "",
      platformId: ""
    };
  },
  created() {
    this.getIco();
    this.saveFrom();
    this.getCookie("wx_cookie");
  },
  mounted() {},
  methods: {
    getIco: function() {
      let thatData = this;
      if (thatData.$route.query.ico) {
        thatData.cellphone = thatData.$route.query.mobile;
        thatData.platformId = thatData.$route.query.platId;
        thatData.postIcoLogin();
      }
    },
    postIcoLogin: function() {
      let thatData = this;

      let data = {
        cellphone: thatData.cellphone
      };

      let register = base.DES3.encrypt(base.desKey, JSON.stringify(data));

      let jsonData = {
        register: register,
        platformId: thatData.platformId,
        type: 2
      };

      this.$http
        .post("/twap/api/open/platformUserOpen", this.$qs.stringify(jsonData), {
          headers: base.ajaxHeaderWithoutToken(jsonData)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            localStorage.setItem("token", resData.result.token);
            localStorage.setItem(
              "userLoginData",
              JSON.stringify(resData.result)
            );
            base.data.token = resData.result.token;
            thatData.$router.replace({ path: thatData.$route.query.names });
          } else {
            thatData.resData = resData;
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getCookie: function(objName) {
      //获取指定名称的cookie的值
      let thatData = this;
      let arrStr = document.cookie.split("; ");
      for (var i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split("=");
        if (temp[0] == objName) {
          thatData.wx_cookie = unescape(temp[1]);
          thatData.postData();
        }
      }
    },
    saveFrom: function() {
      let thatData = this;
      let strin = "";
      for (let prop in thatData.$route.params) {
        strin = strin + "/" + thatData.$route.params[prop];
      }
      thatData.fromPage = strin;
    },
    postData: function() {
      let thatData = this;

      let data = {
        cookieValue: thatData.wx_cookie
      };

      this.$http
        .post("/api/wechat/login", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;
          if (resData.status == 0 || resData.status == -3) {
            if (resData.result.token) {
              localStorage.setItem("token", resData.result.token);
              localStorage.setItem(
                "userLoginData",
                JSON.stringify(resData.result)
              );
              base.data.token = resData.result.token;
            } else {
              localStorage.removeItem("token");
              localStorage.removeItem("userLoginData");
              base.data.token = "";
            }
            if (thatData.fromPage != "") {
              if (
                thatData.$route.query.wxOpenId ||
                thatData.$route.query.urlKey
              ) {
                location.href =
                  thatData.fromPage +
                  "?wxOpenId=" +
                  thatData.$route.query.wxOpenId +
                  "&urlKey=" +
                  thatData.$route.query.urlKey;
                /* thatData.$router.replace({
                  path: thatData.fromPage,
                  query: {
                    wxOpenId: thatData.$route.query.wxOpenId,
                    urlKey: thatData.$route.query.urlKey
                  }
                }); */
              } else {
                thatData.$router.replace({ path: thatData.fromPage });
              }
            } else {
              thatData.$router.replace({ path: "/invest_index" });
            }
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
.wechat-login {
  width: 75%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

.wechat-login .gif {
  height: 146px;
  text-align: center;
}

.wechat-login img {
  height: 100%;
}

.wechat-login p {
  padding-top: 16px;
  font-size: 12px;
  text-align: center;
  color: #666;
}
</style>
