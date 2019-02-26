<template>
  <div>
    <div class="repay-calend">
      <div class="payback-tips" v-show="paybackTips">
        <p>
          今天有回款，预计24点前回款至账户余额
          <img src="/static/img/wap_start_10.png" @click="paybackTips = false">
        </p>
      </div>
      <div class="payback-tips" v-show="vipLimitTips">
        <p>
          您的权益标有{{vipLimit}}元额度可加入
          <router-link :to="'/invest_tenindex/' + planId">去加入></router-link>
        </p>
      </div>
      <div class="header-data clear">
        <div class="left-data">
          <p class="num" v-show="switchCapital">{{waitCapitalAmount}}</p>
          <p class="num" v-show="!switchCapital">{{receivedCapitalAmount}}</p>
          <p class="title" v-show="switchCapital">
            本月待收本金
            <img src="/static/img/mobile_repay_calend.png" @click="alert(0)">
          </p>
          <p class="title" v-show="!switchCapital">本月已收本金</p>
        </div>
        <div class="right-data">
          <p class="num" v-show="switchCapital">{{waitInterest}}</p>
          <p class="num" v-show="!switchCapital">{{receivedInterest}}</p>
          <p class="title" v-show="switchCapital">本月待收利息</p>
          <p class="title" v-show="!switchCapital">本月已收利息</p>
        </div>
      </div>
      <div class="cent-calend">
        <div class="year-month-bar clear">
          <div class="year-bar">
            <span>{{toYear}}年</span>
          </div>
          <div
            class="month-bar"
            v-swiper:swiperM="swiperMonth"
            @touchStart="startS()"
            @transitionEnd="endS()"
          >
            <div class="swiper-wrapper"></div>
          </div>
        </div>
        <div class="date-bar">
          <div class="week-line clear">
            <span>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span>六</span>
          </div>
          <div class="date-line" v-swiper:swiperD="swiperDate" @touchend="slideDate()">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <ul class="clear" id="calendar">
                  <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
                  <li v-for="(dayobject,index) in days" :key="index">
                    <!--本月-->
                    <!--如果不是本月-->
                    <span v-if="dayobject.day.getMonth()+1 != toMonth">&nbsp;</span>
                    <!--如果是本月  还需要判断是不是这一天-->
                    <span v-else @click="activeDate(index)" :class="{active:index==activeSpan}">
                      <!--今天  同年同月同日-->
                      <span
                        v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate() && dayobject.status == null"
                        class="today"
                        @click="empty = true,tips = false"
                      >今</span>
                      <span
                        v-else-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate() && dayobject.status == 1"
                        class="today not"
                        @click="currentPage = 0,postDate(formatDate(dayobject.day.getFullYear(),dayobject.day.getMonth()+1,dayobject.day.getDate())),list = []"
                      >今</span>
                      <span
                        v-else-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate() && dayobject.status == 0"
                        class="today already"
                        @click="currentPage = 0,postDate(formatDate(dayobject.day.getFullYear(),dayobject.day.getMonth()+1,dayobject.day.getDate())),list = []"
                      >今</span>
                      <span
                        v-else-if="dayobject.status == 1"
                        class="not date-click"
                        @click="currentPage = 0,postDate(formatDate(dayobject.day.getFullYear(),dayobject.day.getMonth()+1,dayobject.day.getDate())),list = []"
                      >{{dayobject.day.getDate()}}</span>
                      <span
                        v-else-if="dayobject.status == 0"
                        class="already date-click"
                        @click="currentPage = 0,postDate(formatDate(dayobject.day.getFullYear(),dayobject.day.getMonth()+1,dayobject.day.getDate())),list = []"
                      >{{dayobject.day.getDate()}}</span>
                      <span
                        v-else
                        class="date-click"
                        @click="empty = true,tips = false"
                      >{{dayobject.day.getDate()}}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="example-bar">
          <p>
            <span class="left">
              <span></span>已回款日
            </span>
            <span class="right">
              <span></span>待回款日
            </span>
          </p>
        </div>
      </div>
      <div class="today-payback" v-show="empty == false && tips == false">
        <div class="padding-left">
          <div class="payback-line padding-right border-one-half-bottom">
            <span>当天待回款本息</span>
            <span class="right">{{todayWaitAmount}}元</span>
          </div>
          <div class="payback-line padding-right">
            <span>当天已回款本息</span>
            <span class="right">{{todayReceviedAmount}}元</span>
          </div>
        </div>
      </div>
      <div class="footer-list">
        <div class="empty" v-show="empty">
          <p>今天暂无回款记录</p>
        </div>
        <div class="tips" v-show="tips">
          <p>点击日期可查看当天回款信息</p>
        </div>
        <div class="list" v-show="empty == false && tips == false">
          <div class="list-title border-one-half-bottom">
            <span>回款列表</span>
            <span class="right">本金+利息(元)</span>
          </div>
          <van-list
            v-model="listLoading"
            :finished="listFinished"
            @load="listOnLoad"
            :loading-text="'加载中...'"
            :immediate-check="false"
          >
            <van-cell
              :class="{'border-one-half-bottom':index + 1 != list.length}"
              v-for="(va,index) in list"
              :key="index"
              :name="index"
            >
              <div class="clear">
                <div class="left">
                  <span class="borrow-name">{{va.borrowtile}}</span>
                  <br>
                  <span class="numbering">
                    {{va.title}}
                    <span class="label" v-show="va.repayStatus==2">已回款</span>
                    <span class="label not" v-show="va.repayStatus==1">待回款</span>
                  </span>
                </div>
                <div class="right">
                  <span class="amount">
                    <span>{{va.realCapital}}</span>+
                    <span>{{va.realInterest}}</span>
                  </span>
                </div>
              </div>
            </van-cell>
          </van-list>
          <!-- <p class="load-more" v-show="currentPage < totalPage" @click="postDate(listDate)">点击加载更多</p>
          <p class="no-more" v-show="currentPage >= totalPage">没有更多数据了</p>-->
        </div>
      </div>
      <transition name="interests-tip">
        <div id="interests-tip" v-show="interestsTip">
          <div class="block"></div>
          <div class="window">
            <p class="tips-text">您的权益标有{{vipLimit}}元额度可加入</p>
            <div class="to-join">
              <router-link :to="'/invest_tenindex/' + planId">
                <img src="/static/img/mobile_repay_calend_04.png">
              </router-link>
            </div>
            <div id="interests-clos">
              <img src="/static/img/interior_closed.png" @click="interestsTip = !interestsTip">
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr"; //轮播组件
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

export default {
  data() {
    return {
      waitCapitalAmount: "",
      waitInterest: "",
      receivedCapitalAmount: "",
      receivedInterest: "",
      planId: "",
      vipLimit: "0",
      switchCapital: true,
      toDay: 1,
      toMonth: 1,
      toYear: 1970,
      toWeek: 1,
      activeSpan: "-1",
      empty: false,
      tips: false,
      inst: false,
      days: [],
      listDate: "",
      todayReceviedAmount: "",
      todayWaitAmount: "",
      paybackTips: false,
      list: [],
      currentPage: 0,
      totalPage: 1,
      startTouth: null,
      endTran: null,
      fetchToken: "",
      interestsTip: false,
      vipLimitTips: false,
      vipTipsTimes: 0,
      swiperMonth: {
        speed: 500,
        initialSlide: 5,
        slidesPerView: 5, //一行显示的切换块数量
        centeredSlides: true, //选中项是否居中
        preventIntercationOnTransition: true, //在切换过渡中是否锁定再次切换
        slideToClickedSlide: true, //可以通过点击切换
        virtual: {
          slides: (function() {
            var slides = [];
            let tD = new Date();
            let beFy = tD.getFullYear() - 2016;
            let afTy = 3;
            for (var x = 0; x < beFy + afTy; x++) {
              for (var i = 0; i < 12; i++) {
                slides.push(i + 1);
              }
            }
            for (var y = 0; y < tD.getMonth() + 1; y++) {
              slides.push(y + 1);
            }
            return slides;
          })(),
          renderSlide: function(slide, index) {
            return (
              '<div class="swiper-slide"><span>' + slide + "月</span></div>"
            );
          }
        },
        allowSlideNext: true,
        allowSlidePrev: true
      },
      swiperDate: {
        watchSlidesProgress: true,
        preventIntercationOnTransition: true, //在切换过渡中是否锁定再次切换
        allowSlideNext: true,
        allowSlidePrev: true
      },
      listLoading: false,
      listFinished: false,
      jumpLast: false
    };
  },
  created() {
    let that = this;
    //that.getAppToken()
    this.$route.query.jumpLast * 1 == 1
      ? (this.jumpLast = true)
      : (this.jumpLast = false);
    that.slideIndex();
  },
  mounted() {
    let that = this;
    that.getAppToken();
    //that.initData(null);
  },
  methods: {
    jumpLastDate() {
      let thatData = this;
      setTimeout(function() {
        if ($("#calendar span").hasClass("today") && thatData.jumpLast) {
          if (
            $("#calendar span.today")
              .parent()
              .parent()
              .prev()
              .children()
              .children().length == 0
          ) {
            $("#calendar span.today").click();
          } else {
            $("#calendar span.today")
              .parent()
              .parent()
              .prev()
              .children()
              .children()
              .click();
          }
          thatData.jumpLast = false;
        } else if (
          $("#calendar span").hasClass("today") &&
          !thatData.jumpLast
        ) {
          $("#calendar span.today").click();
        } else {
          $(".date-click")
            .eq(0)
            .click();
        }
      }, 10);
    },
    listOnLoad() {
      setTimeout(() => {
        this.postDate(this.listDate);
      }, 800);
    },
    slideDate: function() {
      let that = this;
      let progress = that.swiperD.slides[0].progress;
      if (
        progress < 0 &&
        that.swiperM.allowSlideNext &&
        that.swiperD.allowSlideNext &&
        !that.swiperM.isBeginning
      ) {
        that.startTouth = that.swiperM.activeIndex;
        console.log("<<<<<");
        that.swiperM.slidePrev();
        that.swiperM.allowSlideNext = false;
        that.swiperM.allowSlidePrev = false;
        that.swiperD.allowSlideNext = false;
        that.swiperD.allowSlidePrev = false;
      } else if (
        progress > 0 &&
        that.swiperM.allowSlideNext &&
        that.swiperD.allowSlideNext &&
        !that.swiperM.isEnd
      ) {
        that.startTouth = that.swiperM.activeIndex;
        console.log(">>>>>");
        that.swiperM.slideNext();
        that.swiperM.allowSlideNext = false;
        that.swiperM.allowSlidePrev = false;
        that.swiperD.allowSlideNext = false;
        that.swiperD.allowSlidePrev = false;
      }
    },
    alert: function(inst) {
      if (inst == 0) {
        mui.alert("不包含G自动服务待出借的本金", " ", "知道了");
      } else if (inst == 1) {
        mui.alert("利息包含：回款利息、加息收益", " ", "知道了");
      }
    },
    activeDate: function(index) {
      let thatData = this;
      thatData.activeSpan = index;
    },
    startS: function() {
      let that = this;
      that.startTouth = that.swiperM.activeIndex;
    },
    endS: function() {
      let that = this;
      that.endTran = that.swiperM.activeIndex;
      if (that.startTouth == that.endTran) {
      } else if (that.startTouth > that.endTran) {
        let preDif = that.startTouth - that.endTran;
        let thatDate = new Date(that.formatDate(that.toYear, that.toMonth, 1));
        thatDate = new Date(thatDate.setMonth(that.toMonth - preDif));
        that.pickPre(thatDate.getFullYear(), thatDate.getMonth() + 1);
      } else if (that.startTouth < that.endTran) {
        let nextDif = that.endTran - that.startTouth;
        let thatDate = new Date(that.formatDate(that.toYear, that.toMonth, 1));
        thatDate = new Date(thatDate.setMonth(that.toMonth + nextDif - 1));
        if (thatDate.getMonth() == 0) {
          that.pickNext(thatDate.getFullYear() - 1, 12);
        } else {
          that.pickNext(thatDate.getFullYear(), thatDate.getMonth());
        }
      }
    },
    slideIndex: function() {
      let that = this;
      let tD = new Date();
      let tM = tD.getMonth();
      let tY = tD.getFullYear();
      that.swiperMonth.initialSlide = (tY - 2016) * 12 + tM;
    },
    initData: function(cur) {
      let that = this;
      let date;
      if (cur) {
        date = new Date(cur);
      } else {
        let now = new Date();
        let d = new Date(
          that.formatDate(now.getFullYear(), now.getMonth() + 1, 1)
        );
        d.setDate(42);
        date = new Date(
          that.formatDate(now.getFullYear(), now.getMonth() + 1, 1)
        );
      }

      that.toDay = date.getDate();
      that.toYear = date.getFullYear();
      that.toMonth = date.getMonth() + 1;
      that.toWeek = date.getDay(); // 1...6,0

      let str = that.formatDate(that.toYear, that.toMonth, that.toDay);

      that.days.length = 0;
      //初始化本周
      let arrayMap = that.postMonth(); //开始请求本月回款数据

      for (let i = that.toWeek; i >= 0; i--) {
        let d = new Date(str);
        d.setDate(d.getDate() - i);
        let dayobject = {}; //用一个对象包装Date对象  以便为以后预定功能添加属性
        dayobject.day = d;
        let td = that.formatDate(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        );
        let mapGet = arrayMap.get(td);
        if (mapGet > 0) {
          dayobject.status = 1;
        } else if (mapGet == 0) {
          dayobject.status = 0;
        } else {
        }
        that.days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
      }
      //其他周
      for (let i = 1; i < 42 - that.toWeek; i++) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        let dayobject = {};
        dayobject.day = d;
        let td = that.formatDate(
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate()
        );
        let mapGet = arrayMap.get(td);
        if (mapGet > 0) {
          dayobject.status = 1;
        } else if (mapGet == 0) {
          dayobject.status = 0;
        } else {
        }
        that.days.push(dayobject);
      }
    },
    pickPre: function(year, month) {
      let that = this;
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      let d = new Date(that.formatDate(year, month, 1));
      d.setDate(0);
      that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    pickNext: function(year, month) {
      let that = this;
      let d = new Date(that.formatDate(year, month, 1));
      d.setDate(42);
      that.initData(that.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      let y = year;
      let m = month;
      if (m < 10) m = "0" + m;
      let d = day;
      if (d < 10) d = "0" + d;
      return y + "-" + m + "-" + d;
    },
    // 返回 类似 201601 格式的字符串
    formatYM: function(year, month) {
      let y = year;
      let m = month;
      if (m < 10) m = "0" + m;
      return y + "" + m;
    },
    getAppToken: function() {
      let thatData = this;
      thatData
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
            thatData.initData();
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            base.data.token = dataRes.transferData.token;
            localStorage.setItem("token", dataRes.transferData.token);
            thatData.initData();
          }
        });
    },
    compareDate: function(date1, date2) {
      let oDate1 = new Date(date1);
      let oDate2 = new Date(date2);
      if (oDate1 < oDate2) {
        this.switchCapital = false;
      } else {
        this.switchCapital = true;
      }
    },
    postMonth: function() {
      let thatData = this;
      let myMap = new Map();
      thatData.empty = false;
      thatData.tips = true;
      thatData.activeSpan = "-1";
      thatData.compareDate(
        thatData.toYear + "/" + thatData.toMonth + "/" + 1,
        new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + 1
      );

      let data = {
        date: thatData.formatYM(thatData.toYear, thatData.toMonth)
      };

      $.ajax({
        type: "POST",
        headers: base.ajaxHeadersWithToken(data),
        dataType: "json",
        async: false,
        data: data,
        url: "/api/assets/asts_repayment_calendar",
        success: function(data) {
          //console.log(data)
          if (data.status == 0) {
            thatData.waitCapitalAmount = data.result.waitCapitalAmount;
            thatData.waitInterest = data.result.waitInterest;
            thatData.receivedCapitalAmount = data.result.receivedCapitalAmount;
            thatData.receivedInterest = data.result.receivedInterest;
            thatData.planId = data.result.planId;
            thatData.vipLimit = data.result.vipLimit;

            let toDate = new Date();
            if (
              thatData.formatYM(thatData.toYear, thatData.toMonth) ==
                thatData.formatYM(
                  toDate.getFullYear(),
                  toDate.getMonth() + 1
                ) &&
              thatData.vipLimit * 1 > 0 &&
              thatData.vipTipsTimes < 1
            ) {
              thatData.interestsTip = true;
              thatData.vipLimitTips = true;
              thatData.vipTipsTimes++;
            }

            let mapArr = data.result.calendarList;
            for (let i = 0; i < mapArr.length; i++) {
              myMap.set(mapArr[i].repayDate, mapArr[i].norepayNum);
            }
            thatData.swiperM.allowSlideNext = true;
            thatData.swiperM.allowSlidePrev = true;
            thatData.swiperD.allowSlideNext = true;
            thatData.swiperD.allowSlidePrev = true;

            /* setTimeout(function() {
              if ($("#calendar span").hasClass("today")) {
                $("#calendar span.today").click();
              } else {
              }
            }, 10); */

            thatData.jumpLastDate();
          } else {
            mui.alert(data.msg);
          }
        }
      });
      return myMap;
    },
    postDate: function(day) {
      let thatData = this;
      if (thatData.currentPage < thatData.totalPage) {
        thatData.listDate = day;

        let data = {
          dateDay: day,
          pageNum: ++thatData.currentPage
        };

        this.$http
          .post(
            "/api/assets/asts_repayment_calendar_detail",
            this.$qs.stringify(data),
            {
              headers: base.ajaxHeadersWithToken(data)
            }
          ) //axios进行ajax请求
          .then(function(response) {
            //console.log(response)
            let resData = response.data;
            if (resData.status == 0) {
              if (resData.result.list.length != 0) {
                thatData.empty = false;
                thatData.tips = false;

                thatData.todayReceviedAmount =
                  resData.result.todayReceviedAmount;
                thatData.todayWaitAmount = resData.result.todayWaitAmount;
                let toDate = new Date();
                if (
                  day ==
                    thatData.formatDate(
                      toDate.getFullYear(),
                      toDate.getMonth() + 1,
                      toDate.getDate()
                    ) &&
                  thatData.vipLimit * 1 == 0
                ) {
                  thatData.paybackTips = true;
                }
                //console.log(day == thatData.formatDate(toDate.getFullYear(), toDate.getMonth() + 1, toDate.getDate()))

                thatData.totalPage = resData.result.pageEntity.totalPage;

                for (let i = 0; i < resData.result.list.length; i++) {
                  let listArr = {};
                  if (resData.result.list[i].plantitle) {
                    listArr.borrowtile = resData.result.list[i].plantitle;
                  } else {
                    listArr.borrowtile = resData.result.list[
                      i
                    ].borrowtile.split("(")[0];
                  }
                  listArr.title = resData.result.list[i].title;
                  listArr.realCapital = resData.result.list[i].realCapital;
                  listArr.repayStatus = resData.result.list[i].repayStatus;
                  listArr.realInterest = resData.result.list[i].realInterest;
                  thatData.list.push(listArr);
                }
              } else {
                thatData.empty = true;
              }
              thatData.listLoading = false;
            } else {
              mui.alert(resData.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        thatData.listLoading = false;
        thatData.listFinished = true;
      }
    }
  }
};
</script>
<style>
@import "../../../style/css/mobile_repay_calend.css";
</style>
