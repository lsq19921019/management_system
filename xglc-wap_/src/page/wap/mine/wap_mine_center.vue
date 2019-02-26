<!-- 我的-我的中心 -->
<template>
  <div>
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :pulling-text="'下拉刷新'"
      :loosing-text="'释放即可刷新'"
      :loading-text="'刷新中...'"
    >
      <div class="mine-center" :style="{'min-height':height + 'px'}">
        <div class="reg-login-line clear in-padding margin-b" @click="clickInfo()">
          <div class="header-box">
            <img v-show="userCenterData.headImg" :src="userCenterData.headImg">
            <img v-show="!userCenterData.headImg" src="/static/img/wap_mine_center.png">
          </div>
          <div class="user-data">
            <p class="has-login" v-show="login">
              {{userCenterData.nickName}}
              <span>{{userCenterData.phone.substr(0,3) + "****" + userCenterData.phone.substr(7)}}</span>
            </p>
            <p class="not-login" v-show="!login">
              {{userCenterData.nickName}}
              <span>注册领888元红包</span>
            </p>
          </div>
          <div class="right">
            <img src="/static/img/wap_assets_center_05.png">
          </div>
        </div>
        <div class="ad_line margin-b" v-if="adImg.length > 0">
          <a :href="adImg[0].bgImageURL" target="_blank">
            <img :src="adImg[0].bgImagePath">
          </a>
        </div>
        <div class="line_tab margin-b">
          <div class="mui-row">
            <div class="mui-col-xs-3" @click="clickBankCard()">
              <div class="tab_icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wodeyinhangqia"></use>
                </svg>
              </div>
              <div class="tab_title">
                <p>银行卡</p>
              </div>
            </div>
            <div class="mui-col-xs-3" @click="clickCoupon()">
              <div class="tab_icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-wodeyouhuiquan"></use>
                </svg>
              </div>
              <div class="tab_title">
                <p>优惠券</p>
              </div>
            </div>
            <div class="mui-col-xs-3" @click="clickInvite()">
              <div class="tab_icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yaoqinghaoyou"></use>
                </svg>
              </div>
              <div class="tab_title">
                <p>邀请有奖</p>
              </div>
            </div>
            <div class="mui-col-xs-3">
              <router-link to="/service/serviceIndex" style="display: block;height: 100%;">
                <div class="tab_icon">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kefuzhongxin"></use>
                  </svg>
                </div>
                <div class="tab_title">
                  <p>客服中心</p>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="tab-line" @click="clickVip()">
          <div class="border-box border-one-half-bottom">
            <div class="clear">
              <div class="left">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-quanyibiaotequan1"></use>
                </svg>
                <span>权益标特权</span>
              </div>
              <div class="right">
                <span v-show="userCenterData.vipstatus == 1 && login">未开通</span>
                <span v-show="userCenterData.vipstatus == 2 && login">已开通</span>
                <img src="/static/img/wap_assets_center_05.png">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-line margin-b" @click="clickEvaluation()">
          <div class="border-box">
            <div class="clear">
              <div class="left">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-fengxianceping"></use>
                </svg>
                <span>风险测评</span>
              </div>
              <div class="right">
                <span v-show="userCenterData.riskStatus && login">{{userCenterData.riskStatus}}</span>
                <span v-show="!userCenterData.riskStatus && login">未测评</span>
                <img src="/static/img/wap_assets_center_05.png">
              </div>
            </div>
          </div>
        </div>
        <div class="tab-line margin-b" @click="clickSetting()">
          <div class="border-box">
            <div class="clear">
              <div class="left">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shezhi1"></use>
                </svg>
                <span>设置</span>
              </div>
              <div class="right">
                <img src="/static/img/wap_assets_center_05.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <wap-footer ref="footer"></wap-footer>
  </div>
</template>
<script>
import wapFooter from "../wap_footer.vue";
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      isLoading: false,
      userCenterData: {
        phone: ""
      },
      login: false,
      type: ["谨慎型", "稳健型", "平衡型", "成长型", "进取型"],
      adImg: []
    };
  },
  components: {
    wapFooter,
    wapAlert
  },
  created() {
    this.checkUserLogin();
    this.postAD();
    this.autoHeight();
  },
  mounted: function() {
    this.$refs.footer.activeMine();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.checkUserLogin();
        this.postAD();
        this.isLoading = false;
      }, 500);
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight - 61;
    },
    checkUserLogin() {
      if (localStorage.getItem("token")) {
        this.postData();
      } else {
        this.postDataNoLogin();
      }
    },
    clickSetting: function() {
      if (this.login) {
        this.$router.push({ path: "/mine_setting" });
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickEvaluation: function() {
      if (this.login) {
        if (this.userCenterData.riskStatus == "未测评") {
          this.$router.push({ path: "/riskass" });
          localStorage.setItem("riskFrom", "mine");
        } else {
          let level = this.type.indexOf(this.userCenterData.riskStatus) + 1;
          this.$router.push({ path: "/riskok/" + level });
          localStorage.setItem("riskFrom", "mine");
        }
      } else {
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickVip: function() {
      if (this.login) {
        this.$router.push({ path: "/new_pri" });
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickInvite: function() {
      if (this.login) {
        location.href = this.userCenterData.yqyjLink;
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickCoupon: function() {
      if (this.login) {
        this.$router.push({ path: "/mine_coupon" });
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickBankCard: function() {
      if (this.login) {
        this.checkBankcard();
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    clickInfo: function() {
      if (this.login) {
        this.$router.push({ path: "/mine_user_info" });
      } else {
        localStorage.setItem("from", location.href);
        this.$router.replace({ path: "/start_login" });
      }
    },
    find: function(str, cha, num) {
      let x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
    },
    checkLogin: function() {
      let thatData = this;
      if (localStorage.getItem("token")) {
      } else {
      }
    },
    checkBankcard: function() {
      let thatData = this;
      if (thatData.userCenterData.cgtStatus == 1) {
        //没激活 跳转去激活
        thatData.$refs.alert.goToAppAcOpen(1);
      } else if (thatData.userCenterData.cgtStatus == 2) {
        //没激活 跳转去激活
        thatData.$refs.alert.goToAppAcOpen(2);
      } else if (thatData.userCenterData.cgtStatus == 3) {
        localStorage.setItem("from", location.href);
        //thatData.$router.push({ path: "/mine_bind_bankcard" });
        location.href = "/mine_open_jump/bind";
      } else {
        thatData.$router.push({ path: "/mine_bank_card" });
      }
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/user/index", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.login = true;
            thatData.userCenterData = resData.result;
            localStorage.setItem(
              "userCenterData",
              JSON.stringify(resData.result)
            );
            /* let userJson = JSON.parse(localStorage.getItem("userLoginData"));
            userJson.cgtStatus = resData.result.cgtStatus;
            localStorage.setItem("userLoginData", JSON.stringify(userJson)); */
            let indexL = thatData.find(
              thatData.userCenterData.yqyjLink,
              "/",
              2
            );
            thatData.userCenterData.yqyjLink = thatData.userCenterData.yqyjLink.substring(
              indexL
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
    },
    postDataNoLogin: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/user/index", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.login = false;
            thatData.userCenterData = resData.result;
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postAD: function() {
      let thatData = this;

      let data = {
        imgPosition: "MYSELEF_APGE_ADSTAR"
      };

      this.$http
        .post("/api/find/picture", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.adImg = resData.result.items;
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
@import "../../../style/css/wap_mine_center.css";
</style>
