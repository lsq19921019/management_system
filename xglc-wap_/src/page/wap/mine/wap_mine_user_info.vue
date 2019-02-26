<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <div class="user-info">
      <div style="padding-bottom: 7px"></div>
      <div class="header-line" @click="$router.push({ path: '/appDownload' })">
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>头像</span>
            </div>
            <div class="right">
              <img class="right-header" v-show="userInfoData.headImg" :src="userInfoData.headImg">
              <img
                class="right-header"
                v-show="!userInfoData.headImg"
                src="/static/img/wap_mine_center.png"
              >
              <img class="right-icon" src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="tab-line margin-b" @click="$router.push({ path: '/appDownload' })">
        <div class="border-box">
          <div class="clear">
            <div class="left">
              <span>用户名</span>
            </div>
            <div class="right">
              <span>{{userInfoData.userName}}</span>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="tab-line" @click="$router.push({ path: '/appDownload' })">
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>更换注册手机号</span>
            </div>
            <div class="right">
              <span>{{userInfoData.cellphoneText}}</span>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-line"
        @click="(userInfoData.realName)? $router.push({ path: '/mine_info_realname' }) : $refs.alert.goToAppAcOpen(1) "
      >
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>实名认证</span>
            </div>
            <div class="right">
              <span v-show="userInfoData.realName">{{userInfoData.realName}}</span>
              <span v-show="!userInfoData.realName" class="empty">未认证</span>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div class="tab-line margin-b" @click="$router.push({ path: '/appDownload' })">
        <div class="border-box">
          <div class="clear">
            <div class="left">
              <span>邮箱认证</span>
            </div>
            <div class="right">
              <span v-show="userInfoData.email"></span>
              <span v-show="!userInfoData.email" class="empty">未认证</span>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-line"
        @click="cgtStatus == 2 ?$refs.alert.goToAppAcOpen(2) : $router.push({ path: '/mine_user_auth' })"
      >
        <div class="border-box border-one-half-bottom">
          <div class="clear">
            <div class="left">
              <span>授权服务</span>
            </div>
            <div class="right">
              <span></span>
              <img src="/static/img/wap_assets_center_05.png">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      userInfoData: {
        //phone:"",
      }
    };
  },
  components: {
    wapAlert
  },
  created() {
    this.chBg("#f2f2f2");
    this.postData();
  },
  mounted() {},
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/user/info", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.userInfoData = resData.result;
            thatData.cgtStatus = resData.cgtStatus;
            localStorage.setItem(
              "userInfoData",
              JSON.stringify(resData.result)
            );
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
@import "../../../style/css/wap_mine_user_info.css";
</style>
