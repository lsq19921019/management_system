<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="change-pass">
      <div style="padding-bottom: 7px;"></div>
      <div class="input-line in-padding input-bg">
        <div class="in-border">
          <span>原密码</span>
          <input v-model="oldPass" type="password" placeholder="请输入旧密码">
        </div>
      </div>
      <div class="input-line in-padding input-bg">
        <div class="in-border no-border">
          <span>新密码</span>
          <input v-model="newPass" type="password" placeholder="6~20位，至少含字母、数字">
        </div>
      </div>
      <div class="in-padding">
        <button class="btn" @click="checkPass()">确定修改</button>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      oldPass: "",
      newPass: ""
    };
  },
  watch: {
    oldPass: function(val) {
      if (this.oldPass.length > 20) {
        this.oldPass = val.slice(0, 20);
      }
    },
    newPass: function(val) {
      if (this.newPass.length > 20) {
        this.newPass = val.slice(0, 20);
      }
    }
  },
  components: {
    wapAlert
  },
  created() {},
  mounted() {},
  methods: {
    checkPass: function() {
      let thatData = this;
      if (
        base.checkPwordOld(thatData.oldPass) &&
        base.checkPword(thatData.newPass)
      )
        thatData.postPassword();
    },
    postPassword: function() {
      var thatData = this;

      var data = {
        oldPassword: base.DES3.encrypt(base.desKey, thatData.oldPass),
        newPassword: base.DES3.encrypt(base.desKey, thatData.newPass)
      };

      this.$http
        .post("/api/user/modifyLoginPassword", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            mui.toast("修改成功", { duration: 1000, type: "div" });
            setTimeout(function() {
              thatData.$router.push({ path: "/mine_center" });
            }, 600);
          } else if (resData.status == -3) {
            thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else if (resData.status == -5) {
            thatData.$refs.alert.loginSwitchDevice(); //切换设备 激活提示函数 并跳转到登录页
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
@import "../../../style/css/wap_mine_change_pass.css";
</style>
