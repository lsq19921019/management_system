<template>
  <div id="dec-lot">
    <div class="top">
      <img src="static/img/dec_lottery_bg.jpg">
      <span class="winner-num">中奖人数：<span id="win-n"></span></span>
    </div>
    <div class="center">
      <div class="borad">
        <img class="borad-img" src="/static/img/dec_lottery_board.png">
        <div class="prize" id="win-box">
          <span class="icon one one-0"><img src="/static/img/dec_lottery_prize_1.png"></span>
          <span class="icon one one-1"><img src="/static/img/dec_lottery_prize_2.png"></span>
          <span class="icon one one-2"><img src="/static/img/dec_lottery_prize_3.png"></span>
          <span class="icon one one-7"><img src="/static/img/dec_lottery_prize_4.png"></span>
          <span class="icon start"><img src="/static/img/dec_lottery_prize_5.png"></span>
          <span class="icon one one-3"><img src="/static/img/dec_lottery_prize_6.png"></span>
          <span class="icon one one-6"><img src="/static/img/dec_lottery_prize_7.png"></span>
          <span class="icon one one-5"><img src="/static/img/dec_lottery_prize_8.png"></span>
          <span class="icon one one-4"><img src="/static/img/dec_lottery_prize_9.png"></span>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="/static/img/s_dec_footlogo.0.1.png">
    </div>
    <div id="bomb">
      <div class="block"></div>
      <div class="window">
        <div class="btn-out">
          <img class="wbtn not" src="/static/img/lottery_alert_btn_again.png">
          <img class="wbtn yet" src="/static/img/lottery_alert_btn_reg.png">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dec_lottery",
  data() {
    return {};
  },
  created() {
    this.chBg("#dc3a24");
  },
  methods: {
    chBg: function(bg) {
      document.body.style.backgroundColor = bg;
    }
  },
  mounted() {
    var outUrl = this.$route.query.stype;
    $(function() {
      //弹框
      var clos = $("#clos");
      var bomb = $("#bomb");
      var block = $("#bomb .block");
      var win = $("#bomb .window");
      var wbtnN = $("#bomb .wbtn.not");
      var wbtnY = $("#bomb .wbtn.yet");

      var bombShow = function() {
        bomb.addClass("show");
        block.addClass("show");
        if (userTimes <= 1) {
          win.addClass("show not");
          wbtnN.addClass("show");
        } else if (userTimes > 1) {
          win.addClass("show yet");
          wbtnY.addClass("show");
        }
      };
      var bombClose = function() {
        block.addClass("clos");
        win.addClass("clos");
        setTimeout(function() {
          bomb.removeClass("show");
          block.removeClass("show clos");
          win.removeClass("show not clos");
          wbtnN.removeClass("show");
          $(".start").trigger("click");
        }, 290);
      };

      function Winner() {
        let startTime = 1506819600;
        let nowTime = Math.round(new Date() / 1000);
        let dif = Math.round((nowTime - startTime) / 60 / 30 * 2);
        $("#win-n").text(dif);
      }

      var lottery = {
        index: -1, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 10, //初始转动速度
        times: 0, //转动次数
        cycle: 20, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
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

      function roll() {
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
          bombShow();
        } else {
          if (lottery.times < lottery.cycle) {
            lottery.speed -= 10;
          } else if (lottery.times == lottery.cycle) {
            var index = (Math.random() * lottery.count) | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
            userTimes += 1;
            if (index > 4 && userTimes < 2) {
              lottery.prize = 0;
            } else if (index <= 4 && userTimes < 2) {
              lottery.prize = 5;
            } else if (userTimes >= 2) {
              lottery.prize = 4;
            }
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
      }
      //开始
      Winner();
      var clickFlag = false;
      var userTimes = 0;

      lottery.init("win-box");
      $(".start").on("click", function() {
        if (clickFlag) {
          //click控制一次抽奖过程中不能重复点击抽奖按钮，后面的点击不响应
          return false;
        } else {
          lottery.speed = 100;
          roll(); //转圈过程不响应click事件，会将click置为false
          clickFlag = true; //一次抽奖完成后，设置click为true，可继续抽奖
          return false;
        }
      });

      $(".wbtn.not").on("click", function() {
        bombClose();
      });

      $(".wbtn.yet").on("click", function() {
        if (outUrl == null) {
          outUrl = 1;
        }
        window.location.href = "/dec_lottery_reg?stype=" + outUrl;
      });
    });
  }
};
</script>
<style lang="css" scoped>
#dec-lot {
  position: relative;
}

#dec-lot .top img {
  display: block;
  width: 100%;
}

#dec-lot .top .winner-num {
  position: absolute;
  right: 30px;
  top: 40px;
  font-size: 14px;
  color: #ffd4c5;
}

#dec-lot .center {
  position: absolute;
  top: 240px;
}

#dec-lot .center .borad {
  width: 88%;
  margin: 0 auto;
  position: relative;
}

#dec-lot .center .borad-img {
  width: 100%;
}

#dec-lot .center .borad .prize {
  width: 89.4%;
  margin: 0 auto;
  position: absolute;
  top: 19px;
  right: 0;
  bottom: 0;
  left: 0;
}

#dec-lot .center .borad .prize .icon {
  float: left;
  width: 31.7%;
  border: 2px solid rgba(255, 255, 255, 0);
  border-radius: 13px;
}

#dec-lot .center .borad .prize .icon.active {
  border: 2px solid #ffc002;
  transform: scale(1.12, 1.12);
}

#dec-lot .center .borad .prize .icon img {
  display: block;
  width: 100%;
}

#dec-lot .footer {
  padding-top: 253px;
}

#dec-lot .footer img {
  width: 51%;
  display: block;
  margin: 0 auto;
  margin-bottom: 36px;
}

#dec-lot #bomb {
  display: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

#dec-lot #bomb.show {
  display: block;
}

#dec-lot #bomb .block {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

#dec-lot #bomb .block.show {
  animation: show-block 0.3s ease-out;
  -webkit-animation: show-block 0.3s ease-out;
}

#dec-lot #bomb .block.clos {
  animation: clos-block 0.3s ease-out;
  -webkit-animation: clos-block 0.3s ease-out;
}

#dec-lot #bomb .window {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 84%;
  height: 230px;
  margin-left: -42%;
  margin-top: -104px;
}

#dec-lot #bomb .window.not {
  background: url("/static/img/lottery_alert_bg_not.png") no-repeat;
  background-size: contain;
}

#dec-lot #bomb .window.yet {
  background: url("/static/img/lottery_alert_bg_yet.png") no-repeat;
  background-size: contain;
}

#dec-lot #bomb .window.show {
  animation: show-window 0.3s ease-out;
  -webkit-animation: show-window 0.3s ease-out;
}

#dec-lot #bomb .window.clos {
  animation: clos-window 0.3s ease-out;
  -webkit-animation: clos-window 0.3s ease-out;
}

#dec-lot #bomb .window .btn-out {
  position: absolute;
  top: 123px;
}

#dec-lot #bomb .window .btn-out .wbtn.not,
#dec-lot #bomb .window .btn-out .wbtn.yet {
  width: 60.3%;
  margin: 0 auto;
  display: none;
}

#dec-lot #bomb .window .btn-out .wbtn.show {
  display: block;
}

@keyframes show-window {
  0% {
    opacity: 0;
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
  }
  80% {
    -webkit-transform: scale(1.12, 1.12);
    transform: scale(1.12, 1.12);
  }
  100% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
}

@keyframes show-block {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes clos-window {
  0% {
    opacity: 1;
    -webkit-transform: scale(1, 1);
    transform: scale(1, 1);
  }
  20% {
    -webkit-transform: scale(1.12, 1.12);
    transform: scale(1.12, 1.12);
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(0, 0);
    transform: scale(0, 0);
  }
}

@keyframes clos-block {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
