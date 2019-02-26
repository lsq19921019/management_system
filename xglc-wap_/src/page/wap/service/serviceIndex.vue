<!--
    create : luofeifei 2018-09-01
    desc : 客服中心-首页
-->
<template>
  <div class="serviceBox">
    <div v-wechat-title="$route.meta.title = titleTip"></div>
    <!-- 头部 -->
    <div class="header">
      <p class="header-name">Hi，{{ username }}</p>
      <p class="header-info">已为您定制如下内容</p>
    </div>
    <!-- 猜你喜欢 -->
    <div class="related">
      <div class="rel-tit after">
        <span class="rel-tit-left">猜您喜欢</span>
        <div class="rel-tit-ref" @click="getAppToken">
          <span class="change">换一换</span>
          <img src="./images/ico-refresh.png" alt>
        </div>
      </div>
      <div class="rel-list">
        <ul>
          <li class="after" v-for="(item,index) in quesList" :key="index" @click="quesans(item.id)">
            <div class="rel-list-item">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 问题分类 -->
    <div class="quesSort">
      <div class="ques-tit after">问题分类</div>
      <div class="sort-list">
        <div
          class="sort-list-item"
          v-for="(item,index) in sortList"
          :key="index"
          @click="clickpop(item.id,item.isHaveSecond,item.name)"
        >
          <img :src="item.imgUrl" :alt="item.name">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 联系客服 -->
    <div class="linkService">
      <div class="link-tit after">联系客服</div>
      <div class="service-list">
        <div class="service-list-item" @click="toWx()">
          <img src="./images/ico-wxId.png" alt>
          <p>微信公众号</p>
        </div>
        <div class="service-list-item" @click="loginfeedback">
          <img src="./images/ico-idea.png" alt>
          <p>意见反馈</p>
        </div>
        <div class="service-list-item">
          <a @click="toPhone">
            <img src="./images/ico-phone.png" alt>
            <p>客服热线</p>
          </a>
        </div>
      </div>
      <div class="link-btn" @click="onLineSer">
        <a>在线客服</a>
      </div>
    </div>
    <ques-pop v-if="isCover" :parentParam="queskey"></ques-pop>
    <div id="cover" v-if="isCover" @click="hideQueskey"></div>
  </div>
</template>

<script>
import quespop from "./components/quesPop";
import * as clipboard from "clipboard-polyfill";
export default {
  data() {
    return {
      isCover: false,
      quesList: "", //猜你喜欢问题列表
      username: "", //用户名 为""则没有登陆
      sortList: "", //问题分类列表
      queskey: "",
      phoneid: "400-700-4007",
      titleTip: "客服中心"
    };
  },
  components: {
    "ques-pop": quespop
  },
  created() {
    let _this = this;
    _this.conterfirst();
  },
  mounted() {
    let that = this;
    that.getAppToken();
  },
  methods: {
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
            //console.log("123")
            thatData.centerQuestionChange();
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              thatData.noCenterQuestionChange();
            } else {
              base.data.token = dataRes.transferData.token;
              localStorage.setItem("token", dataRes.transferData.token);
              thatData.centerQuestionChange();
            }
            return thatData.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "showBackBarButton",
                transferData: {}
              },
              msg: "success"
            });
          }
        })
        .then(data => {
          if (data == "wap") {
          } else {
            return thatData.$withApp("takeAppTable", {
              status: 0,
              result: {
                transferName: "switchTableColor",
                transferData: {
                  color: "2"
                }
              },
              msg: "success"
            });
          }
        })
        .then(data => {
          if (data == "wap") {
          } else {
            data = JSON.parse(data);
            location.setItem("appTableColor", data.result.transferData.color);
          }
        });
    },
    // 跳转
    clickpop: function(id, isHaveSecond, name) {
      if (isHaveSecond == 1) {
        this.$router.push({
          path: "/service/question",
          query: { id: id, isHasSecondSort: isHaveSecond, type: 0, name: name }
        });
      } else if (isHaveSecond == 2) {
        this.$router.push({
          path: "/service/oneQuestionList",
          query: { id: id, isHaveSecond: isHaveSecond, name: name }
        });
      }
    },
    //客服中心（猜你想问问题 换一换）
    centerQuestionChange: function() {
      let thatData = this;
      this.$http
        .post("/api/help/centerQuestionChange", this.$qs.stringify(), {
          headers: base.ajaxHeadersWithToken()
        })
        .then(function(res) {
          //console.log(res);
          if (res.data.status == 0) {
            let resData = res.data;
            thatData.quesList = resData.result.helpCenterQuestionVos;
            thatData.username = resData.result.username; //
          }
        });
    },
    noCenterQuestionChange: function() {
      let thatData = this;
      this.$http
        .post("/api/help/centerQuestionChange", this.$qs.stringify(), {
          headers: base.ajaxHeaderWithoutToken()
        })
        .then(function(res) {
          //console.log(res);
          if (res.data.status == 0) {
            let resData = res.data;
            thatData.quesList = resData.result.helpCenterQuestionVos;
            thatData.username = resData.result.username;
          }
        });
    },
    //客服中心（一级分类）
    conterfirst: function() {
      let thatData = this;
      this.$http
        .post("/api/help/centerfirst", this.$qs.stringify(), {
          headers: base.ajaxHeaderWithoutToken()
        })
        .then(function(res) {
          if (res.data.status == 0) {
            let resData = res.data;
            thatData.sortList = resData.result.helpCenterQuestionVos;
          }
        });
    },
    //问题答案
    quesans: function(id) {
      var _this = this;
      this.queskey = id;
      this.isCover = true;
    },
    hideQueskey: function() {
      this.isCover = false;
    },
    // 微信公众号弹框
    toWx: function() {
      var btnArray = ["取消", "复制"];
      mui.confirm("微信公众号：xiaogelicai", " ", btnArray, function(e) {
        if (e.index == 1) {
          mui.toast("复制微信号成功");
          clipboard.writeText("xiaogelicai");
        }
      });
    },
    call() {
      window.location.href = `tel:${this.phoneid}`;
    },
    // 客服热线弹框
    toPhone: function() {
      var btnArray = ["取消", "呼叫"];
      var that = this;
      mui.confirm(
        "400-700-4007" + "\n" + "工作日9:00~18:30",
        " ",
        btnArray,
        function(e) {
          if (e.index == 1) {
            that.call();
          }
        }
      );
    },
    //在线客服
    onLineSer: function() {
      var _this = this;
      _this
        .$withApp("takeAppOpen", {
          status: 0,
          result: {
            transferName: "openUdesk",
            transferData: {}
          },
          msg: "success"
        })
        .then(data => {
          if (data == "wap") {
            //wap业务逻辑代码
            _this.$router.push("/appDownload");
          } else {
            data = JSON.parse(data);
          }
        })
        .then(data => {
          // 桥接方法处理完毕并返回data 往下执行
        });
    },
    //意见反馈
    feedback: function() {
      this.$withApp("takeAppOpen", {
        status: 0,
        result: {
          transferName: "openFeedback",
          transferData: {}
        },
        msg: "success"
      })
        .then(data => {
          if (data == "wap") {
            //wap业务逻辑代码
          } else {
            data = JSON.parse(data);
          }
        })
        .then(data => {
          // 桥接方法处理完毕并返回data 往下执行
        });
    },
    loginfeedback: function() {
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
            _this.$router.push("/appDownload");
          } else {
            data = JSON.parse(data);
            let dataRes = data.result;
            if (dataRes.transferData.token == "null") {
              return _this.$withApp("takeAppOpen", {
                status: 0,
                result: {
                  transferName: "goToAppLogin",
                  transferData: {}
                },
                msg: "success"
              });
            } else {
              base.data.token = dataRes.transferData.token;
              _this.feedback();
            }
          }
        })
        .then(data => {
          //goToAppLogin 桥接方法处理完毕并返回data 往下执行
        });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.serviceBox {
  background: #f4f4f4;
  //头部
  .header {
    background: #ff5637;
    padding: 0.5rem 0.3rem;
    .header-name {
      font-size: 0.4rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 1);
    }
    .header-info {
      font-size: 0.28rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 0.2rem;
    }
  }
  //猜你喜欢
  .related {
    background: #fff;
    margin-top: 0.14rem;
    .rel-tit {
      display: flex;
      justify-content: space-between;
      padding: 0.3rem;
      position: relative;
      .rel-tit-left {
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(22, 35, 55, 1);
      }
      .rel-tit-ref {
        display: flex;
        align-items: center;
        img {
          width: 0.24rem;
          height: 0.24rem;
          margin-left: 0.13rem;
        }
        .change {
          font-size: 0.28rem;
          font-weight: 400;
          color: rgba(255, 86, 55, 1);
        }
      }
    }
    .rel-list {
      margin-left: 0.3rem;
    }
    .rel-list ul li {
      list-style: none;
      padding: 0.3rem 0.3rem 0.3rem 0;
      position: relative;
      &:last-child {
        border-bottom: none;
      }
      .rel-list-item {
        font-size: 0.28rem;
        font-weight: 400;
        color: rgba(85, 85, 85, 1);
        word-break: break-all;
      }
    }
  }
  //问题分类
  .quesSort {
    background: #fff;
    margin-top: 0.14rem;
    .ques-tit {
      position: relative;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(22, 35, 55, 1);
      padding: 0.3rem;
    }
    .sort-list {
      display: flex;
      padding: 0 0.3rem 0.4rem;
      flex-wrap: wrap;
      .sort-list-item {
        text-align: center;
        margin-top: 0.44rem;
        max-width: 1.7rem;
        min-width: 1.7rem;
        img {
          width: 0.38rem;
          height: 0.38rem;
        }
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(85, 85, 85, 1);
          margin-top: 0.18rem;
        }
      }
    }
  }
  //联系客服
  .linkService {
    background: #fff;
    margin-top: 0.14rem;
    margin-bottom: 0.8rem;
    .link-tit {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(22, 35, 55, 1);
      padding: 0.3rem;
      position: relative;
    }
    .service-list {
      display: flex;
      padding: 0.44rem 0.54rem 0.4rem;
      .service-list-item {
        text-align: center;
        &:nth-child(n + 2) {
          margin-left: 0.86rem;
        }
        img {
          width: 0.38rem;
          height: 0.38rem;
        }
        p {
          font-size: 0.24rem;
          font-weight: 400;
          color: rgba(85, 85, 85, 1);
          margin-top: 0.18rem;
          a {
            color: rgba(85, 85, 85, 1);
          }
        }
      }
    }
    .link-btn {
      text-align: center;
      a {
        display: inline-block;
        text-align: center;
        background: linear-gradient(
          90deg,
          rgba(253, 121, 75, 1),
          rgba(255, 99, 69, 1),
          rgba(255, 86, 55, 1)
        );
        border-radius: 2.5em;
        border: none;
        padding: 0.3rem 2.6rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 0.48rem;
      }
    }
  }
}
#cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
/* 当前蒙层显示时生效 */
.noScroll {
  overflow-y: hidden;
}
.after::before {
  content: "";
  bottom: 0;
  left: 0;
  position: absolute;
  width: 200%;
  height: 1px;
  border-bottom: 1px solid #ddd;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  transform: scale(0.5, 0.5);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
