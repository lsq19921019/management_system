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
      <div class="mi-center" :style="{'min-height':height + 'px'}">
        <div class="top-assets">
          <div class="show-assets">
            <span v-show="!showAssets" @click="setShowAssets()">
              <img src="/static/img/wap_assets_center_02.png">
            </span>
            <span v-show="showAssets" @click="setShowAssets()">
              <img src="/static/img/wap_assets_center_03.png">
            </span>
          </div>
          <div class="assets-total" @click="goDetail()">
            <p v-show="showAssets">{{centerData.totalAssets}}</p>
            <p v-show="!showAssets">*****</p>
          </div>
          <div class="assets-title">
            <p>总资产(元)</p>
          </div>
          <div class="assets-receive mui-row">
            <div @click="goTotalIncome()" class="mui-col-xs-6">
              <p v-show="showAssets" class="receive-money">{{centerData.totalProceeds}}</p>
              <p v-show="!showAssets" class="receive-money">*****</p>
              <p class="receive-title">累计收益(元)</p>
            </div>
            <div class="mui-col-xs-6">
              <p
                v-show="showAssets"
                class="receive-money"
                style="border-right: none;"
              >{{centerData.waitInterest}}</p>
              <p v-show="!showAssets" class="receive-money" style="border-right: none;">*****</p>
              <p class="receive-title">待收利息(元)</p>
            </div>
          </div>
        </div>
        <div class="center-tab">
          <div class="assets-btn mui-row">
            <a @click="withcheckAccount()" class="mui-col-xs-6">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tixian"></use>
              </svg>
              提现
            </a>
            <span
              @click="checkAccount()"
              class="mui-col-xs-6"
              style="border-left: 1px solid #f2f2f2;"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chongzhi"></use>
              </svg>
              充值
            </span>
          </div>
          <div
            class="withdrawing border-one-half-top"
            v-if="centerData.withdrawamount*1 > 0 && centerData.withdrawamount != ''"
            @click="goDownload()"
          >
            <p>
              <img class="before" src="/static/img/wap_assets_center_04.png">您有
              <span v-show="showAssets">{{centerData.withdrawamount}}</span>
              <span v-show="!showAssets">*****</span>元正在提现中
              <img class="after" src="/static/img/wap_assets_center_05.png">
            </p>
          </div>
          <div style="margin-bottom: 8px;"></div>
          <div class="tab-line" style="margin-bottom: 8px;">
            <router-link to="/assets_funds_records">
              <p>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-keyongyue"></use>
                </svg>可用余额
                <span class="data">
                  <span v-show="showAssets">{{centerData.usableSum}}</span>
                  <span v-show="!showAssets">*****</span>元
                </span>
                <img src="/static/img/wap_assets_center_05.png">
              </p>
            </router-link>
          </div>
          <div class="tab-line">
            <a @click="goInvestDetailsG()">
              <p class="border-one-half-bottom">
                <svg class="icon" aria-hidden="true" style="width: 6.8%;">
                  <use xlink:href="#icon-dingcunbaoX"></use>
                </svg>G自动服务
                <span class="data">
                  本金：
                  <span v-show="showAssets">{{centerData.planXWaitPrincipal}}</span>
                  <span v-show="!showAssets">*****</span>元
                </span>
                <img src="/static/img/wap_assets_center_05.png">
              </p>
            </a>
          </div>
          <div class="tab-line" style="margin-bottom: 8px;">
            <router-link to="/appDownload">
              <p>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-sanbiaoyuzhaiquan"></use>
                </svg>散标&债权
                <span class="data">
                  本金：
                  <span v-show="showAssets">{{centerData.borrowWaitPrincipal}}</span>
                  <span v-show="!showAssets">*****</span>元
                </span>
                <img src="/static/img/wap_assets_center_05.png">
              </p>
            </router-link>
          </div>
          <div style="margin-bottom: 8px;"></div>
          <div class="tab-line">
            <a :href="centerData.repayCalendUrl">
              <p class="border-one-half-bottom">
                <svg class="icon" aria-hidden="true" style="width: 7.2%;left: -0.04rem;">
                  <use xlink:href="#icon-huikuanrili"></use>
                </svg>回款日历
                <img src="/static/img/wap_assets_center_05.png">
              </p>
            </a>
          </div>
          <div class="tab-line" style="margin-bottom: 8px;">
            <router-link to="/assets_auto_continue">
              <p>
                <svg class="icon" aria-hidden="true" style="width: 5.9%;">
                  <use xlink:href="#icon-zidongxutou"></use>
                </svg>自动续投
                <span class="data">
                  <span
                    v-show="centerData.autoInvestFreeAmont * 1 == 0"
                    class="label"
                  >{{centerData.autoInvestTag}}</span>
                  <span
                    v-show="centerData.autoInvestFreeAmont * 1 > 0"
                  >续投冻结：{{centerData.autoInvestFreeAmont}}元</span>
                </span>
                <img src="/static/img/wap_assets_center_05.png">
              </p>
            </router-link>
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
      showAssets: true,
      cgtStatus: "", //开户情况
      centerData: {
        totalAssets: "0.00", //总资产
        totalProceeds: "0.00", //累计收益
        waitInterest: "0.00", //总待收利息
        usableSum: "0.00", //可用余额
        planXWaitPrincipal: "0.00", //G自动服务待收本金
        borrowWaitPrincipal: "0.00" //散标待收本金
      },
      height: 0
    };
  },
  components: {
    wapFooter,
    wapAlert
  },
  created() {
    let thatData = this;
    if (localStorage.getItem("showAssets")) {
      thatData.showAssets = eval(
        localStorage.getItem("showAssets").toLowerCase()
      );
    }
  },
  mounted: function() {
    this.$refs.footer.activeAssets();
    this.autoHeight();
    this.checkLogin();
  },
  methods: {
    /*     saveContinue(m) {
      if (m * 1 > 0) {
        localStorage.setItem("userLockContinue", m);
      }
      this.$router.push({ path: "/assets_auto_continue" });
    }, */
    onRefresh() {
      setTimeout(() => {
        this.checkLogin();
        this.isLoading = false;
      }, 500);
    },
    autoHeight() {
      this.height = document.documentElement.clientHeight - 61;
    },
    goInvestDetailsG() {
      let thatData = this;
      let planX = {
        planXAll: thatData.centerData.planXAll,
        planXWaitInterest: thatData.centerData.planXWaitInterest,
        planXWaitPrincipal: thatData.centerData.planXWaitPrincipal
      };
      localStorage.setItem("planG", JSON.stringify(planX));
      thatData.$router.push({ path: "/assets_record_g" });
    },
    goTotalIncome: function() {
      let thatData = this;
      thatData.$router.push({
        path:
          "/assets_income?totalProceeds=" +
          parseFloat(thatData.centerData.totalProceeds)
      });
    },
    setShowAssets: function() {
      let thatData = this;
      thatData.showAssets = !thatData.showAssets;
      localStorage.setItem("showAssets", thatData.showAssets);
    },
    goDownload: function() {
      let thatData = this;
      //thatData.$router.push("/withrecord");
      thatData.$router.push("/withrecord");
    },
    goDetail: function() {
      let thatData = this;
      thatData.$router.push("/assets_detail");
    },
    checkLogin: function() {
      let thatData = this;
      if (!localStorage.getItem("token")) {
        thatData.$refs.alert.notLogin();
      } else {
        thatData.postData();
      }
    },
    //  跳到充值页面
    checkAccount: function() {
      let thatData = this;
      if (thatData.cgtStatus == 1) {
        thatData.$refs.alert.notAccount();
      } else if (thatData.cgtStatus == 2) {
        thatData.$refs.alert.goToAppAcOpen(2);
      } else if (thatData.cgtStatus == 3) {
        mui.confirm("请先绑定银行卡", " ", ["取消", "去绑卡"], function(e) {
          if (e.index == 1) {
            localStorage.setItem("from", location.href);
            //thatData.$router.push({ path: "/mine_bind_bankcard" });
            location.href = "/mine_open_jump/bind"
          }
        });
      } else {
        localStorage.setItem("from", location.href);
        localStorage.removeItem("userRechargeData");
        thatData.$router.push({ path: "/assets_recharge" });
      }
    },
    //  跳到提现页面
    withcheckAccount: function() {
      let thatData = this;
      if (thatData.cgtStatus == 1) {
        thatData.$refs.alert.notAccount();
      } else if (thatData.cgtStatus == 2) {
        thatData.$refs.alert.goToAppAcOpen(2);
      } else if (thatData.cgtStatus == 3) {
        mui.confirm("请先绑定银行卡", " ", ["取消", "去绑卡"], function(e) {
          if (e.index == 1) {
            localStorage.setItem("from", location.href);
            //thatData.$router.push({ path: "/mine_bind_bankcard" });
            location.href = "/mine_open_jump/bind"
          }
        });
      } else {
        localStorage.setItem("from", location.href);
        localStorage.removeItem("userWithMoney");
        thatData.$router.push({ path: "/withdrawalpage" });
      }
    },
    postData: function() {
      let thatData = this;

      let data = {};

      this.$http
        .post("/api/assets/index", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.cgtStatus = resData.cgtStatus;
            thatData.centerData = resData.result;
          } else if (resData.status == "0030") {
            if (resData.cgtStatus == 2) {
              thatData.$refs.alert.notActivation();
            } else {
              thatData.$refs.alert.notAccount();
            }
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
@import "../../../style/css/wap_assets_center.css";
</style>
