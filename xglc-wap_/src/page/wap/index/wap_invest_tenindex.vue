<!-- 投资-标的首页 -->
<template>
  <div>
    <div v-wechat-title="$route.meta.title= title"></div>
    <wap-alert ref="alert"></wap-alert>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :pulling-text="'下拉刷新'"
      :loosing-text="'释放即可刷新'"
      :loading-text="'刷新中...'"
    >
      <div class="inv-teni">
        <div class="top-income margin-b">
          <p class="interest-rate">
            {{ yield }}
            <span class="plus" v-show="jxYield">
              {{jxYield}}
              <span class="tip">{{jxTips}}</span>
            </span>
          </p>
          <p class="bottom-tip">往期年化收益率</p>
        </div>
        <div class="title border-one-half-bottom">
          <h5>产品介绍
            <router-link :to="'/invest_tendetail/' + userPlanData.planId">
              详情
              <img src="/static/img/wap_invest_index_01.png">
            </router-link>
          </h5>
        </div>
        <div class="center-introduce margin-b in-padding">
          <div class="introduce-li">
            <ul>
              <li v-for="(introduce,index) in proIntroduceMapList" :key="index">
                <p>{{introduce.value}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="title border-one-half-bottom">
          <h5>产品周期</h5>
        </div>
        <div class="center-cycle margin-b in-padding">
          <div class="bar-box">
            <div class="bar-text mui-row">
              <div class="mui-col-xs-3">
                <span>今日加入</span>
              </div>
              <div class="mui-col-xs-4">
                <span>自动出借项目</span>
              </div>
              <div class="mui-col-xs-5">
                <span>项目到期还款</span>
              </div>
            </div>
            <div class="bar-line mui-row">
              <div class="inner-line"></div>
              <div class="mui-col-xs-3">
                <span></span>
              </div>
              <div class="mui-col-xs-4">
                <span></span>
              </div>
              <div class="mui-col-xs-5">
                <span></span>
              </div>
            </div>
            <div class="bar-text bar-date mui-row">
              <div class="mui-col-xs-3">
                <span>{{joinDate}}</span>
              </div>
              <div class="mui-col-xs-4">
                <span>{{matchDate}}(预计)</span>
              </div>
              <div class="mui-col-xs-5">
                <span>{{outDate}}(以项目为准)</span>
              </div>
            </div>
          </div>
        </div>
        <div class="title border-one-half-bottom">
          <h5>出借动态
            <router-link :to="{path:'/invest_waitBor',query:{templateId:templateId}}">
              待出借的项目
              <img src="/static/img/wap_invest_index_01.png">
            </router-link>
          </h5>
        </div>
        <div class="center-dynamic margin-b">
          <div class="list">
            <!--数据列表-->
            <van-list
              v-model="matchLoading"
              :finished="matchFinished"
              @load="matchLoad"
              :loading-text="'加载中...'"
              :immediate-check="false"
              class="in-padding"
              style="padding-top: 0;"
            >
              <van-cell
                v-for="(entity,index) in matchTrendsEntity"
                :class="{'border-one-half-bottom':index!=matchTrendsEntity.length-1}"
                :key="index"
                :name="index"
              >
                <div class="clear">
                  <div class="left">
                    <span class="left-person">{{entity.investor}} {{entity.investAmount}}</span>
                    <br>
                    <span class="left-date">{{entity.investDate}}</span>
                  </div>
                  <div class="center">
                    <img src="/static/img/wap_invest_tenindex_02.png">
                  </div>
                  <div class="right">
                    <span class="right-person">{{entity.borrower}} {{entity.borrowAmount}}</span>
                    <br>
                    <span class="right-another">{{entity.note}}</span>
                  </div>
                </div>
              </van-cell>
            </van-list>
            <!-- <p class="load-more" v-show="pageNum < totalPage" @click="postTrend()">点击加载更多</p>
            <p class="no-more" v-show="pageNum >= totalPage">没有更多数据了</p>-->
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="invest-btn" v-if="$route.params.type != 1">
      <span @click="clickLogin()" v-if="!isLogin" class="unlock">{{tips}}</span>
      <span v-else>
        <span
          @click="toconfirm()"
          v-if="status == 2 && userPlanData.planType != 6"
          class="unlock"
        >{{tips}}</span>
        <span v-else-if="status == 2 && userPlanData.planType == 6">
          <span @click="toconfirm()" class="unlock vip" v-if="canIvstflag == 0 && vipStatus == 2">
            {{tips}}
            <p>还可加入{{userPlanData.canIvstMoney}}元</p>
          </span>
          <span
            @click="toconfirm()"
            class="unlock"
            v-else-if="canIvstflag == 1 && vipStatus == 1"
          >{{tips}}</span>
          <span class="lock" v-else-if="canIvstflag == 1 && vipStatus == 2">{{tips}}</span>
        </span>
        <span v-else-if="status != 2" class="lock">{{tips}}</span>
      </span>
      <div class="ip-x" style="height: 24px;background: #fff;" v-if="ipX"></div>
    </div>
  </div>
</template>
<script>
import wapAlert from "../wap_alert.vue";
export default {
  data() {
    return {
      isLoading: false,
      templateId: "",
      title: "",
      yield: "",
      jxYield: "",
      jxTips: "",
      proIntroduceMapList: [],
      joinDate: "",
      matchDate: "",
      outDate: "",
      matchTrendsEntity: [],
      pageNum: 0,
      totalPage: 1,
      isLogin: false,
      status: "",
      tips: "",
      cgtStatus: "",
      ipX: false,
      vipStatus: "", //权益标是否开通(1未开通2已开通)
      canIvstflag: "", //权益标是否能投资(0可以1不可以)
      qybIntroduce: "", //开通权益标弹窗文案
      openLevelValidate: "", //是否校验等级测评
      overHightLevelDesc: "", //等级测评弹窗提示内容
      userPlanData: {
        title: "", //G自动服务标题
        planId: "", //定存宝id
        planType: "", //产品类型 1新手标 4其他定存宝 6权益标
        continue: "", //是否开启可续投
        continueDesc: "", //可续投说明文案
        showCP: "", //是否显示测评
        isAuth: "", //是否交易授权
        investTopAmount: "", //用户的最大可投金额
        cpUrl: "", //测评跳转链接
        cpDesc: "", //加入页面提示语
        overTopAmountDesc: "", //购买页 超过了可投的金额的提示语
        openAmountValidate: "", //是否校验最大投资金额
        templateId: "", //模板id 查该项目的优惠券和加息券
        yhTips: "", //展示用户满足该项目的优惠数量
        yield: "", //年化利率
        jxYield: "", //加息利率
        totalYield: null, //面板总利率
        currentDhkMoney: null, //当前持有XX元(仅权益标显示)
        canIvstMoney: null, //还可投资XX元(仅权益标显示)
        usableSum: null, //可用余额
        unit: null, //倍数单位
        maxAmount: null, //个人最大可投
        minAmount: null, //起投金额
        remainAmount: null, //剩余可投金额
        lockPeriod: null, //期限
        voucherId: 0, //使用的红包或优惠券id
        amountInput: 0, //input输入投标金额
        useCou: true, //是否使用优惠券
        useRed: false, //是否手动使用红包
        useJxq: false, //是否手动使用加息券
        useFxq: false, //是否手动使用返现券
        calcPrompt: false, //激活计算提醒
        isContinue: false //回款后自动续投
      },
      matchLoading: false,
      matchFinished: false
    };
  },
  components: {
    wapAlert
  },
  created() {
    let _this = this;
    _this.checkIpX();
    _this.getId();
    _this.getAppToken();
    localStorage.removeItem("from");
  },
  mounted() {
    $("#app").css("padding-bottom", "53px");
  },
  methods: {
    matchLoad() {
      setTimeout(() => {
        this.postTrend();
      }, 800);
    },
    onRefresh() {
      this.pageNum = 0;
      this.totalPage = 1;
      setTimeout(() => {
        this.getAppToken(1);
        this.isLoading = false;
      }, 500);
    },
    getAppToken(type) {
      let _this = this;
      _this
        .$withApp("postApp", {
          status: 0,
          result: {
            transferName: "getTokenFromApp",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            _this.checkLogin(type);
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              localStorage.removeItem("token");
              _this.checkLogin(type);
            } else {
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              _this.checkLogin(type);
            }
            return _this.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "showBackBarButton",
                transferData: {}
              },
              msg: "success"
            });
          }
        });
    },
    clickLogin() {
      let _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "goToAppLogin",
            transferData: {
              url: location.href
            }
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            localStorage.setItem("from", location.href);
            _this.$router.replace({ path: "/start_login" });
          }
        });
    },
    checkIpX: function() {
      let wi = document.documentElement.clientWidth;
      let he = document.documentElement.clientHeight;
      if (wi == 375 && he >= 690) {
        this.ipX = true;
      }
    },
    getId: function() {
      let thatData = this;
      thatData.userPlanData.planId = thatData.$route.params.planId;
    },
    checkLogin: function(type) {
      let thatData = this;
      if (localStorage.getItem("token")) {
        thatData.postDetailInLogin(type);
      } else {
        thatData.postDetailNotLogin(type);
      }
    },
    //加载所有页数的优惠券和红包
    postRedCoupon: function() {
      let thatData = this;
      // 请求红包
      let envelopeData = {
        tempId: thatData.templateId,
        cardtype: "2",
        pageNum: "1",
        isused: "1"
      };
      this.$http
        .post(
          "/api/assets/assetsCouponList",
          this.$qs.stringify(envelopeData),
          {
            headers: base.ajaxHeadersWithToken(envelopeData)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            localStorage.setItem("redEnv", JSON.stringify(resData.result));
            //thatData.redEnv = resData.result;
          } else if (resData.status == -3) {
            //thatData.$refs.alert.loginExpired(); //登陆过期 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      // 请求返现券
      let cashBackData = {
        tempId: thatData.templateId,
        cardtype: "5",
        pageNum: "1",
        isused: "1"
      };
      this.$http
        .post(
          "/api/assets/assetsCouponList",
          this.$qs.stringify(cashBackData),
          {
            headers: base.ajaxHeadersWithToken(cashBackData)
          }
        )
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            localStorage.setItem("cashBack", JSON.stringify(resData.result));
            //thatData.coupon = resData.result;
          } else if (resData.status == -3) {
            //thatData.$refs.alert.loginExpired() //登陆过期 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });

      // 请求加息券
      let couponData = {
        tempId: thatData.templateId,
        cardtype: "3",
        pageNum: "1",
        isused: "1"
      };
      this.$http
        .post("/api/assets/assetsCouponList", this.$qs.stringify(couponData), {
          headers: base.ajaxHeadersWithToken(couponData)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            localStorage.setItem("coupon", JSON.stringify(resData.result));
            //thatData.coupon = resData.result;
          } else if (resData.status == -3) {
            //thatData.$refs.alert.loginExpired() //登陆过期 激活提示函数 并跳转到登录页
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postDetailNotLogin: function(type) {
      //进入页面未登录
      let thatData = this;

      let data = {
        planId: thatData.userPlanData.planId
      };

      this.$http
        .post("/api/finance/planXInvestDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeaderWithoutToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.title = resData.result.title;
            thatData.yield = resData.result.yield;
            thatData.jxYield = resData.result.jxYield;
            thatData.jxTips = resData.result.jxTips;
            thatData.proIntroduceMapList = resData.result.proIntroduceMapList;
            thatData.joinDate = resData.result.joinDate;
            thatData.matchDate = resData.result.matchDate;
            thatData.outDate = resData.result.outDate;
            thatData.templateId = resData.result.templateId;
            thatData.tips = resData.result.tips;
            thatData.postTrend(type);
          } else {
            mui.toast(resData.msg, { duration: 1000, type: "div" });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postDetailInLogin: function(type) {
      //进入页面已登陆
      let thatData = this;

      let data = {
        planId: thatData.userPlanData.planId
      };

      this.$http
        .post("/api/finance/planXInvestDetail", this.$qs.stringify(data), {
          headers: base.ajaxHeadersWithToken(data)
        })
        .then(function(response) {
          //console.log(response)
          let resData = response.data;

          if (resData.status == 0) {
            thatData.isLogin = true; //开放 投资按钮

            thatData.title = resData.result.title;
            thatData.yield = resData.result.yield;
            thatData.jxYield = resData.result.jxYield;
            thatData.jxTips = resData.result.jxTips;
            thatData.proIntroduceMapList = resData.result.proIntroduceMapList;
            thatData.joinDate = resData.result.joinDate;
            thatData.matchDate = resData.result.matchDate;
            thatData.outDate = resData.result.outDate;
            thatData.templateId = resData.result.templateId;
            thatData.postRedCoupon(); //请求优惠券一定要在拿到templateId之后
            thatData.status = resData.result.status;
            thatData.tips = resData.result.tips;
            thatData.vipStatus = resData.result.vipStatus;
            thatData.canIvstflag = resData.result.canIvstflag;
            thatData.qybIntroduce = resData.result.qybIntroduce;
            thatData.cgtStatus = resData.cgtStatus;
            thatData.openLevelValidate = resData.result.openLevelValidate;
            thatData.overHightLevelDesc = resData.result.overHightLevelDesc;
            // 要载入缓存的值
            thatData.userPlanData.title = resData.result.title;
            thatData.userPlanData.planType = resData.result.planType;
            thatData.userPlanData.continue = resData.result.continue;
            thatData.userPlanData.continueDesc = resData.result.continueDesc;
            thatData.userPlanData.showCP = resData.result.showCP;
            thatData.userPlanData.isAuth = resData.result.isAuth;
            thatData.userPlanData.investTopAmount =
              resData.result.investTopAmount;
            thatData.userPlanData.cpUrl = resData.result.cpUrl;
            thatData.userPlanData.cpDesc = resData.result.cpDesc;
            thatData.userPlanData.overTopAmountDesc =
              resData.result.overTopAmountDesc;
            thatData.userPlanData.openAmountValidate =
              resData.result.openAmountValidate;
            thatData.userPlanData.templateId = resData.result.templateId;
            if (resData.result.yhTips == "暂无可用") {
              thatData.userPlanData.yhTips = resData.result.yhTips;
            } else {
              thatData.userPlanData.yhTips =
                "<span style='color:#999;'>有</span>" +
                parseInt(resData.result.yhTips) +
                "<span style='color:#999;'>" +
                "张可用" +
                "</span>";
            }
            thatData.userPlanData.yield = resData.result.yield;
            thatData.userPlanData.jxYield = resData.result.jxYield;
            thatData.userPlanData.currentDhkMoney = parseFloat(
              resData.result.currentDhkMoney
            );
            thatData.userPlanData.canIvstMoney = parseFloat(
              resData.result.canIvstMoney
            );
            thatData.userPlanData.usableSum = parseFloat(
              resData.result.usableSum
            );
            thatData.userPlanData.unit = parseFloat(resData.result.unit);
            thatData.userPlanData.maxAmount = parseFloat(
              resData.result.maxAmount
            );
            thatData.userPlanData.minAmount = parseFloat(
              resData.result.minAmount
            );
            thatData.userPlanData.remainAmount = parseFloat(
              resData.result.remainAmount
            );
            thatData.userPlanData.lockPeriod = parseFloat(
              resData.result.lockPeriod
            );
            thatData.userPlanData.totalYield =
              parseFloat(resData.result.yield) +
              parseFloat(resData.result.jxYield);
            thatData.postTrend(type);
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
    postTrend: function(type) {
      // 匹配列表
      let thatData = this;

      if (thatData.pageNum < thatData.totalPage) {
        let data = {
          templateId: thatData.templateId,
          pageNum: ++thatData.pageNum
        };

        this.$http
          .post("/api/finance/planXMatchTrend", this.$qs.stringify(data), {
            headers: base.ajaxHeaderWithoutToken(data)
          })
          .then(function(response) {
            //console.log(response)
            let resData = response.data;

            if (resData.status == 0) {
              if (type == 1) {
                thatData.matchTrendsEntity = [];
              }
              thatData.totalPage = resData.result.pageEntity.totalPage;
              for (
                var i = 0;
                i < resData.result.matchTrendsEntity.length;
                i++
              ) {
                thatData.matchTrendsEntity.push(
                  resData.result.matchTrendsEntity[i]
                );
              }
              thatData.matchLoading = false;
            } else {
              mui.toast(resData.msg, { duration: 1000, type: "div" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.matchLoading = false;
        thatData.matchFinished = true;
      }
    },
    toconfirm: function() {
      //点击加入投资按钮一系列判断
      let thatData = this;
      //let userLoginData = JSON.parse(localStorage.getItem("userLoginData"));
      if (thatData.cgtStatus === "1") {
        //没开户 跳转去开户
        thatData.$refs.alert.goToAppAcOpen(1);
      } else if (thatData.cgtStatus === "2") {
        //没激活 跳转去激活
        thatData.$refs.alert.goToAppAcOpen(2);
      } else if (
        thatData.cgtStatus === "0" ||
        thatData.cgtStatus === "3" ||
        thatData.cgtStatus === "6"
      ) {
        //已开户 进入下一步判断 包含未开通自动授权和未绑卡
        if (thatData.vipStatus == 1 && thatData.userPlanData.planType == 6) {
          //没开通权益标想投资权益标 弹出开通权益标弹窗
          mui.confirm(
            "<p style='text-align:left;'>" + thatData.qybIntroduce + "</p>",
            "特权介绍",
            ["取消", "10元开通"],
            function(e) {
              if (e.index == 1) {
                if (thatData.userPlanData.usableSum >= 10) {
                  //开通权益标特权
                  let data = {};
                  thatData.$http
                    .post("/api/cgt/newUserVip", thatData.$qs.stringify(data), {
                      headers: base.ajaxHeadersWithToken(data)
                    })
                    .then(function(response) {
                      let resData = response.data;
                      if (resData.status == 0) {
                        localStorage.setItem("from", location.href);
                        thatData.$router.push({
                          path: "/re_suc/verfy"
                        });
                      } else {
                        mui.toast(resData.msg, { duration: 1000, type: "div" });
                        setTimeout(function() {
                          thatData.$router.go(-1);
                        }, 800);
                      }
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
                } else {
                  mui.confirm(
                    "余额不足，是否去充值",
                    "提示",
                    ["取消", "充值"],
                    function(e) {
                      if (e.index == 1) {
                        thatData
                          .$withApp("takeAppOpen", {
                            status: 0,
                            result: {
                              transferName: "goToAppRecharge",
                              transferData: {
                                amount: "0"
                              }
                            },
                            msg: "success"
                          })
                          .then(data => {
                            if (data == "wap") {
                              localStorage.setItem("from", location.href);
                              thatData.$router.push({
                                path: "/assets_recharge"
                              });
                            } else {
                              localStorage.setItem("from", location.href);
                            }
                          });
                      }
                    }
                  );
                }
              }
            }
          );
        } else {
          //投资新手标 普通G自动服务 或 投资已开通权益标
          if (thatData.userPlanData.showCP) {
            //需要开启强制测评
            mui.confirm(
              thatData.userPlanData.cpDesc,
              "提示",
              ["取消", "马上测评"],
              function(e) {
                if (e.index == 1) {
                  thatData.$router.push({ path: "/riskass" });
                  localStorage.setItem("riskFrom", "x");
                }
              }
            );
          } else {
            if (thatData.openLevelValidate) {
              //测评等级不够加入当前项目
              mui.confirm(
                thatData.overHightLevelDesc,
                "提示",
                ["取消", "重新测评"],
                function(e) {
                  if (e.index == 1) {
                    thatData.$router.push({ path: "/riskass" });
                    localStorage.setItem("riskFrom", "x");
                  }
                }
              );
            } else {
              localStorage.setItem(
                "userPlanData",
                JSON.stringify(thatData.userPlanData)
              );
              thatData.$router.push({ path: "/invest_conftrans" });
            }
          }
        }
      } /*  else if (thatData.cgtStatus === "6") {
        //未开通自动授权投标
        mui.confirm(
          "您当前没有开启自动投标服务，开启后可进行投资",
          " "[("取消", "去开启")],
          function(e) {
            if (e.index == 1) {
              thatData
                .$withApp("goToAppAuthorizedBid", {
                  status: 0,
                  result: {},
                  msg: "success"
                })
                .then(data => {
                  if (data == "wap") {
                    thatData.$router.push({ path: "/appDownload" });
                  }
                });
            }
          }
        );
      } */
    }
  }
};
</script>
<style scoped>
@import "../../../style/css/wap_invest_tenindex.css";
</style>
