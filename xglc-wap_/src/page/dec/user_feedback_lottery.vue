<template>
  <div>
    <div class="feedback-lottery">
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_01.png">
      </div>
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_02.png">
      </div>
      <div class="lottery">
        <div class="borad">
          <img class="borad-img" src="/static/img/feedback-lottery_10.png">
          <div class="prize" id="win-box">
            <span class="icon one one-0"><img src="/static/img/feedback-lottery_01.png"></span>
            <span class="icon one one-1"><img src="/static/img/feedback-lottery_02.png"></span>
            <span class="icon one one-2"><img src="/static/img/feedback-lottery_03.png"></span>
            <span class="icon one one-7"><img src="/static/img/feedback-lottery_08.png"></span>
            <span class="icon start"><img src="/static/img/feedback-lottery_09.png"></span>
            <span class="icon one one-3"><img src="/static/img/feedback-lottery_04.png"></span>
            <span class="icon one one-6"><img src="/static/img/feedback-lottery_07.png"></span>
            <span class="icon one one-5"><img src="/static/img/feedback-lottery_06.png"></span>
            <span class="icon one one-4"><img src="/static/img/feedback-lottery_05.png"></span>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="lottery-tip">
          <p>抽奖活动每位用户限参与一次，奖品限一份。</p>
        </div>
        <!-- <div class="address-btn">
          <button class="mui-btn">填写收货地址</button>
        </div> -->
      </div>
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_04.png">
      </div>
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_05.png">
      </div>
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_06.png">
      </div>
      <div class="img-line">
        <img src="/static/img/user_feedback_lottery_07.png?v=1">
      </div>
      <transition name="luck-tip">
        <div id="luck-tip" v-show="luckTip">
          <div class="block"></div>
          <div class="window">
            <p class="tips-text">{{tipsText}}</p>
            <div class="tips-btn">
              <button class="mui-btn" @click="luckTip = !luckTip">确定</button>
            </div>
          </div>
        </div>
      </transition>
      <div class="alert-share-tip-lod" v-show="shlodShow">
        <div class="under"></div>
        <div class="window">
          <div class="coin-img"><img src="/static/img/mobile_repay_calend_loading.png"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      luckTip: false,
      tipsText: "",
      shlodShow: false,
    };
  },
  mounted() {
    this.lotteryScroll();
  },
  methods: {
    lotteryScroll() {
      let thatData = this;
      var lottery = {
        index: -1, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 10, //初始转动速度
        times: 0, //转动次数
        cycle: 30, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        postIndex: -1,
        init: function(id) {
          if ($("#" + id).find(".one").length > 0) {
            var $lottery = $("#" + id);
            var $units = $lottery.find(".one");
            this.obj = $lottery;
            this.count = $units.length;
            $lottery.find(".one-" + this.index).addClass("active");
          }
        },
        roll: function() {
          var indexN = this.index;
          var count = this.count;
          var lottery = this.obj;
          $(lottery)
            .find(".one-" + indexN)
            .removeClass("active");
          indexN += 1;
          if (indexN > count - 1) {
            indexN = 0;
          }
          $(lottery)
            .find(".one-" + indexN)
            .addClass("active");
          this.index = indexN;
          return false;
        }
      };

      var roll = function() {
        lottery.times += 1;
        lottery.roll(); //转动过程调用的是lottery的roll方法，这里是第一次调用初始化

        if (
          lottery.times > lottery.cycle + 10 &&
          lottery.prize == lottery.index
        ) {
          clearTimeout(lottery.timer);
          lottery.prize = -1;
          lottery.times = 0;
          clickFlag = false;
          setTimeout(function() {
            thatData.luckTip = true
          }, 800)
          //旋转完调用
        } else {
          if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
          } else if (lottery.times == lottery.cycle) {
            //var index = (Math.random() * lottery.count) | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
            lottery.prize = lottery.postIndex;
          } else {
            if (
              lottery.times > lottery.cycle + 10 &&
              ((lottery.prize == 0 && lottery.index == 7) ||
                lottery.prize == lottery.index + 1)
            ) {
              lottery.speed += 110;
            } else {
              lottery.speed += 20;
            }
          }
          if (lottery.speed < 40) {
            lottery.speed = 40;
          }
          lottery.timer = setTimeout(roll, lottery.speed); //循环调用
        }
        return false;
      };

      //开始
      var clickFlag = false;

      lottery.init("win-box");
      $(".start").on("click", function() {
        if (clickFlag) {
          //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
          return false;
        } else {
          thatData.shlodShow = true
          let data = {};
          thatData.$http
            .post("/api/activity/luckDraw", thatData.$qs.stringify(data), {
              headers: base.ajaxHeadersWithToken(data)
            })
            .then(function(response) {
              thatData.shlodShow = false
              //console.log(response)
              let resData = response.data;

              if (resData.status == 0) {
                lottery.postIndex = resData.result.prizeId * 1;
                if (resData.result.prizeType == 1) {
                  thatData.tipsText = "哇，你就是传说中的幸运之星吧！恭喜你获得" + resData.result.prizeName + "一份，别忘了填写收货地址哦~"
                } else if (resData.result.prizeType == 2) {
                  thatData.tipsText = "哇，手气不错！恭喜你获得" + resData.result.prizeName + "一张，别忘了使用哦~"
                } else if (resData.result.prizeType == 5) {
                  thatData.tipsText = "哇，手气不错！恭喜你获得" + resData.result.prizeName + "一张，别忘了使用哦~"
                }
                lottery.speed = 100;
                roll(); //转圈过程不响应click事件，会将click置为false
                clickFlag = true; //一次抽奖完成后，设置click为true，可继续抽奖
              } else if (resData.status == "0082") {
                thatData.tipsText = "您当前的转盘次数已用完，找找小鸽其它福利吧~"
                thatData.luckTip = true
              } else if (resData.status == "0083") {
                mui.toast("您当前不符合抽奖条件，请阅读活动说明后再试", { duration: 1000, type: "div" });
              } else {
                mui.toast(resData.msg, { duration: 1000, type: "div" });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          return false;
        }
      });
    },
  }
};

</script>
<style lang="css" scoped>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity 0.3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}

.feedback-lottery {
  background: #f3323e;
}

.feedback-lottery .img-line img {
  display: block;
  width: 100%;
}

.feedback-lottery .lottery {
  background: url(/static/img/user_feedback_lottery_03.png) repeat-y center;
  background-size: contain;
}

.feedback-lottery .lottery .borad {
  width: 85.3%;
  margin: 0 auto;
  position: relative;
}

.feedback-lottery .lottery .borad-img {
  width: 100%;
}

.feedback-lottery .lottery .borad .prize {
  width: 86.5%;
  margin: 0 auto;
  position: absolute;
  top: 6%;
  right: 0;
  bottom: 0;
  left: 0;
}

.feedback-lottery .lottery .borad .prize .icon {
  float: left;
  box-sizing: border-box;
  width: 32.9%;
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 7px;
  position: relative;
}

.feedback-lottery .lottery .borad .prize .icon.active::after {
  content: "";
  display: block;
  width: 93.6%;
  height: 93.6%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 7px;
  border: 3px dashed #e60012;
}

.feedback-lottery .lottery .borad .prize .icon img {
  display: block;
  width: 100%;
}

.feedback-lottery .lottery .lottery-tip {
  padding-bottom: 19px;
}

.feedback-lottery .lottery .lottery-tip p {
  font-size: 12px;
  line-height: 25px;
  color: #ff952d;
  text-align: center;
}

.feedback-lottery .lottery .address-btn {
  width: 77.3%;
  margin: auto;
  padding-bottom: 15px;
}

.feedback-lottery .lottery .address-btn button {
  width: 100%;
  background: linear-gradient(to bottom, #f85858, #fa3b44);
  height: 47px;
  font-size: 15px;
  color: #fff;
  border: none;
  border-radius: 9px;
  box-shadow: 0 3px 3px 1px rgba(124, 124, 124, 0.2);
}

.feedback-lottery #luck-tip {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}

.feedback-lottery #luck-tip .block {
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.8;
}

.feedback-lottery #luck-tip .window {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 262px;
  height: 238px;
  transform: translate(-50%, -50%);
  background: url(/static/img/user_feedback_lottery_08.png) no-repeat center;
  background-size: contain;
}

.feedback-lottery #luck-tip .window .tips-text {
  width: 206px;
  font-size: 17px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.feedback-lottery #luck-tip .window .tips-btn {
  position: absolute;
  bottom: 18.2%;
  left: 0;
  width: 100%;
  text-align: center;
}

.feedback-lottery #luck-tip .window .tips-btn button {
  height: 40px;
  width: 62%;
  font-size: 14px;
  line-height: 24px;
  color: #aa5102;
  background: #ffd718;
  border-radius: 5px;
  border: none;
}

.alert-share-tip-lod {
  left: 0;
  bottom: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 98;
}

.alert-share-tip-lod .under {
  position: fixed;
  width: 100%;
  height: 100%;
}

.alert-share-tip-lod .window {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 6px;
  background: #fff;
}

.alert-share-tip-lod .window .coin-img {
  display: block;
  width: 32px;
  height: 32px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.alert-share-tip-lod .window .coin-img img {
  display: block;
  width: 100%;
  animation: rotate .8s linear infinite;
}

.luck-tip-enter-active,
.luck-tip-leave-active {
  transition: opacity 0.3s;
}

.luck-tip-enter,
.luck-tip-leave-to {
  opacity: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>
<style>
.mui-toast-container {
  bottom: 49% !important;
  transition: opacity 0.3s;
}

.mui-toast-message {
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  width: 66%;
  padding: 12px 18px;
  border: 1px solid #2d2d2d;
}

</style>
