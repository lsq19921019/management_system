<template>
  <div>
    <div class="ico-login">
      <div class="gif">
        <img src="/static/img/wechat_login.gif">
      </div>
      <p>tip：优惠券长时间未使用会过期哦~</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      id: "",
      platId: "",
      fromPage: "",
    }
  },
  mounted() {
    this.getPlatId()
  },
  methods: {
    saveFrom: function() {
      let thatData = this
      let strin = ""
      for (let prop in thatData.$route.params) {
        strin = strin + "/" + thatData.$route.params[prop]
      }
      thatData.fromPage = strin
    },
    getPlatId: function() {
      let thatData = this
      thatData.saveFrom()
      thatData.phone = thatData.$route.query.mobile
      thatData.platId = thatData.$route.query.platId
      thatData.postData()
    },
    postData: function() {
      let thatData = this

      let data = {
        cellphone: thatData.phone,
      }

      let cellphone = base.DES3.encrypt(base.desKey, JSON.stringify(data));

      let regData = {
        register: cellphone,
        platformId: thatData.platId,
        type: 2,
      }

      this.$http.post('/api/open/platformUserOpen', this.$qs.stringify(regData), {
          headers: base.ajaxHeaderWithoutToken(regData)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data

          if (resData.status == 0) {
            localStorage.setItem("token", resData.result.token)
            localStorage.setItem("userLoginData", JSON.stringify(resData.result))
            base.data.token = resData.result.token
            if (thatData.fromPage != "") {
              if (thatData.fromPage == "assets_recharge") {
                let cgtstatus = resData.result.cgtStatus
                if (cgtstatus != "0") {
                  thatData.$router.replace({ path: "/assets_center" })
                } else {
                  thatData.$router.replace({ path: thatData.fromPage })
                }
              } else {
                thatData.$router.replace({ path: thatData.fromPage })
              }
            } else {
              thatData.$router.replace({ path: "/invest_index" })
            }
          } else {
            mui.toast(resData.msg, { duration: 1000, type: 'div' })
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
  },
}

</script>
<style scoped>
.ico-login {
  width: 75%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}

.ico-login .gif {
  height: 146px;
  text-align: center;
}

.ico-login img {
  height: 100%;
}

.ico-login p {
  padding-top: 16px;
  font-size: 12px;
  text-align: center;
  color: #666;
}

</style>
