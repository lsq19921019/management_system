import { Base, $ } from "./pub/packages";
require("../css/pages/university_lottery.scss");
$.extend($.easing, {
  easeInOutCirc: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  }
});
Base.showPage();
let main = {
  data: {
    userInfo: {
      nickName: null
    },
    postList: {
      activityNo: "newYear"
    },
    postLottery: {
      level: "",
      activityNo: "newYear"
    }
  },
  doms: {},
  fncs: {},
  bind() {},
  init() {
    var u = 236;
    var n = 1;
    var timer; //定义滚动的定时器
    var result = 8888; //指定中奖结果,可以抽取指定数组中的某一个
    var isBegin = false; //标识能否开始抽奖

    $(".num").css("backgroundPositionY", 472); //开始8888

    //执行数字滚动
    function run() {
      n++;
      $(".num").each(function(index) {
        var _num = $(this);
        _num.animate(
          {
            backgroundPositionY: (u + 1) * n * (index + 1)
          },
          80
        );
      });
      timer = window.setTimeout(run, 70);
      isBegin = true;
    }

    $("#start").click(function() {
      if (isBegin) {
        return false;
      } else if (!main.data.postLottery.level) {
        alert("请在右侧选择抽奖等级");
      } else {
        result = null;
        run();
      }
    });
    //停止抽奖
    $("#stop").click(function() {
      //请求数据
      if (!result) {
        postDo();
      }
    });
    //停止抽奖动画
    function stopAnimate() {
      var num_arr = (result + "").split("");

      $(".num").each(function(index) {
        var _num = $(this);
        setTimeout(function() {
          _num.animate(
            {
              backgroundPositionY: u * 60 - u * num_arr[index]
            },
            {
              duration: 0,
              easing: "easeInOutCirc"
            }
          );
        }, 0);
      });
      window.clearTimeout(timer);
    }
    //奖项选择按钮
    $("#awardBtn").click(function() {
      $(".winner_list").hide("fast");
      $(".award_list").toggle("fast");
    });
    //选择抽取几等奖按钮
    $(".award_list img").click(function() {
      $(".award_list img").removeClass("active");
      $(this).addClass("active");
      $(".center_winner").empty();
      main.data.postLottery.level = $(this).index() + 1;
    });
    //获奖名单按钮
    $("#winnerBtn").click(function() {
      $(".award_list").hide("fast");
      $(".winner_list").toggle("fast");
    });
    //循环加入列表
    function addList(li, p) {
      for (let i = 0; i < li.length; i++) {
        $("." + p).append("<span>" + li[i] + "</span>");
      }
    }
    //请求抽奖
    function postDo() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(1, main.data.postLottery),
        dataType: "json",
        async: true,
        data: main.data.postLottery,
        url: "/api/activity/rewardDraw",
        success: function(data) {
          if (data.status == 0) {
            result = data.result.rewardNo * 1;
            setTimeout(() => {
              $(".center_winner").append(
                "<span class='winner_num'>" + result + "</span>"
              );
              isBegin = false;
            }, 500);
            postLotteryList();
            //停止抽奖动画
            stopAnimate();
          } else {
            if (
              data.msg.indexOf("已失效") > -1 ||
              data.msg.indexOf("权限") > -1
            ) {
              if (confirm(data.msg)) {
                Base.signOut(function() {
                  Base.go("index_login.html");
                });
              }
            } else {
              alert(data.msg);
            }
            result = 8888;
            stopAnimate();
            isBegin = false;
          }
        }
      });
    }
    //获取中奖列表
    postLotteryList();
    function postLotteryList() {
      $.ajax({
        type: "POST",
        headers: Base.initAjaxHeader(1, main.data.postList),
        dataType: "json",
        async: true,
        data: main.data.postList,
        url: "/api/activity/rewardRecord",
        success: function(data) {
          if (data.status == 0) {
            if (data.result.rewardMap.w1) {
              $(".win_1").empty();
              addList(data.result.rewardMap.w1, "win_1");
            }
            if (data.result.rewardMap.w2) {
              $(".win_2").empty();
              addList(data.result.rewardMap.w2, "win_2");
            }
            if (data.result.rewardMap.w3) {
              $(".win_3").empty();
              addList(data.result.rewardMap.w3, "win_3");
            }
            if (data.result.rewardMap.w4) {
              $(".win_4").empty();
              addList(data.result.rewardMap.w4, "win_4");
            }
            if (data.result.rewardMap.w5) {
              $(".win_5").empty();
              addList(data.result.rewardMap.w5, "win_5");
            }
          } else {
            if (data.msg.indexOf("已失效") > -1) {
              if (confirm(data.msg)) {
                Base.signOut(function() {
                  Base.go("index_login.html");
                });
              }
            } else {
              alert(data.msg);
            }
          }
        }
      });
    }
  }
};
main.init();
